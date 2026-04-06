var VISITS_SHEET_NAME = "Website Visits";
var ORDERS_SHEET_NAME = "Online Orders";
var ADMIN_KEY = "CHANGE_THIS_ADMIN_KEY";

var VISITS_HEADERS = [
  "visitor_id",
  "session_id",
  "visitor_email",
  "visited_at",
  "page_path",
  "page_title",
  "page_url",
  "referrer",
  "language",
  "screen_size",
  "user_agent",
];

var ORDERS_HEADERS = [
  "order_id",
  "created_at",
  "updated_at",
  "customer_name",
  "phone",
  "email",
  "product_name",
  "quantity",
  "address",
  "notes",
  "status",
  "payment_method",
  "payment_status",
  "payment_reference",
  "razorpay_payment_id",
  "razorpay_order_id",
  "last_event",
  "visitor_id",
  "session_id",
];

function doGet(e) {
  ensureSheets_();

  var action = getParam_(e, "action", "health");

  try {
    if (action === "logVisit") {
      appendVisit_(visitFromGetParams_(e));
      return respond_(e, { ok: true });
    }

    if (action === "trackOrder") {
      var orderId = normalizeOrderId_(getParam_(e, "orderId", ""));
      return respond_(e, {
        ok: true,
        order: orderId ? findOrderById_(orderId) : null,
      });
    }

    if (action === "listOrders") {
      requireAdminKey_(getParam_(e, "adminKey", ""));
      return respond_(e, {
        ok: true,
        orders: readOrders_(),
      });
    }

    return respond_(e, {
      ok: true,
      message: "Google Sheets webhook is ready.",
      sheets: [VISITS_SHEET_NAME, ORDERS_SHEET_NAME],
    });
  } catch (error) {
    return respond_(e, {
      ok: false,
      error: String(error),
    });
  }
}

function doPost(e) {
  ensureSheets_();

  try {
    var payload = parsePayload_(e);
    var action = payload.action || "";

    if (action === "logVisit") {
      appendVisit_(payload.visit || {});
      return respond_(null, { ok: true });
    }

    if (action === "createOrder") {
      upsertOrder_(payload.order || {});
      return respond_(null, { ok: true });
    }

    if (action === "updateOrder") {
      requireAdminKey_(payload.adminKey || "");
      updateOrder_(payload.orderId || "", payload.updates || {});
      return respond_(null, { ok: true });
    }

    return respond_(null, {
      ok: false,
      error: "Unsupported action.",
    });
  } catch (error) {
    return respond_(null, {
      ok: false,
      error: String(error),
    });
  }
}

function parsePayload_(e) {
  var payloadParam =
    e && e.parameter && e.parameter.payload ? e.parameter.payload : "";
  var contents =
    e && e.postData && e.postData.contents ? e.postData.contents : "";

  if (payloadParam) {
    return JSON.parse(payloadParam);
  }

  if (!contents) {
    return {};
  }

  return JSON.parse(contents);
}

function getSpreadsheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error(
      "Active spreadsheet was not found. Paste this code into the Apps Script project bound to your target Google Sheet.",
    );
  }
  return spreadsheet;
}

function ensureSheets_() {
  ensureSheet_(VISITS_SHEET_NAME, VISITS_HEADERS);
  ensureSheet_(ORDERS_SHEET_NAME, ORDERS_HEADERS);
}

function ensureSheet_(sheetName, headers) {
  var spreadsheet = getSpreadsheet_();
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  var existingHeaders = headerRange.getValues()[0];
  var shouldResetHeaders = existingHeaders.join("") !== headers.join("");

  if (shouldResetHeaders) {
    headerRange.setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }

  return sheet;
}

function appendVisit_(visit) {
  var sheet = ensureSheet_(VISITS_SHEET_NAME, VISITS_HEADERS);

  sheet.appendRow([
    safeText_(visit.visitorId),
    safeText_(visit.sessionId),
    safeText_(visit.visitorEmail),
    safeText_(visit.visitedAt),
    safeText_(visit.pagePath),
    safeText_(visit.pageTitle),
    safeText_(visit.pageUrl),
    safeText_(visit.referrer),
    safeText_(visit.language),
    safeText_(visit.screenSize),
    safeText_(visit.userAgent),
  ]);
}

function upsertOrder_(order) {
  var sheet = ensureSheet_(ORDERS_SHEET_NAME, ORDERS_HEADERS);
  var normalizedOrderId = normalizeOrderId_(order.orderId);

  if (!normalizedOrderId) {
    throw new Error("orderId is missing.");
  }

  var rowIndex = findOrderRowIndex_(sheet, normalizedOrderId);
  var existingOrder = rowIndex > 0 ? readOrderAtRow_(sheet, rowIndex) : null;
  var mergedOrder = mergeObjects_(existingOrder || {}, order);

  mergedOrder.orderId = normalizedOrderId;
  mergedOrder.createdAt =
    safeText_(mergedOrder.createdAt) || new Date().toISOString();
  mergedOrder.updatedAt =
    safeText_(mergedOrder.updatedAt) || new Date().toISOString();
  mergedOrder.lastEvent = safeText_(mergedOrder.lastEvent) || "Order Created";
  mergedOrder.status = safeText_(mergedOrder.status) || "Order Placed";
  mergedOrder.paymentMethod =
    safeText_(mergedOrder.paymentMethod) || "Google Pay";
  mergedOrder.paymentStatus =
    safeText_(mergedOrder.paymentStatus) || "Pending";

  var row = toOrderRow_(mergedOrder);

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, row.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }
}

function updateOrder_(orderId, updates) {
  var sheet = ensureSheet_(ORDERS_SHEET_NAME, ORDERS_HEADERS);
  var normalizedOrderId = normalizeOrderId_(orderId);
  var rowIndex = findOrderRowIndex_(sheet, normalizedOrderId);

  if (rowIndex < 0) {
    throw new Error("Order not found: " + normalizedOrderId);
  }

  var existingOrder = readOrderAtRow_(sheet, rowIndex);
  var mergedOrder = mergeObjects_(existingOrder, updates || {});

  mergedOrder.orderId = normalizedOrderId;
  mergedOrder.updatedAt =
    safeText_(mergedOrder.updatedAt) || new Date().toISOString();
  mergedOrder.lastEvent = resolveLastEvent_(updates || {}, existingOrder);

  sheet
    .getRange(rowIndex, 1, 1, ORDERS_HEADERS.length)
    .setValues([toOrderRow_(mergedOrder)]);
}

function resolveLastEvent_(updates, existingOrder) {
  if (updates.status && updates.status !== existingOrder.status) {
    return "Status changed to " + updates.status;
  }

  if (
    updates.paymentStatus &&
    updates.paymentStatus !== existingOrder.paymentStatus
  ) {
    return "Payment " + updates.paymentStatus;
  }

  return safeText_(existingOrder.lastEvent) || "Order Updated";
}

function toOrderRow_(order) {
  return [
    safeText_(order.orderId),
    safeText_(order.createdAt),
    safeText_(order.updatedAt),
    safeText_(order.customerName),
    safeText_(order.phone),
    safeText_(order.email),
    safeText_(order.productName),
    Number(order.quantity || 0),
    safeText_(order.address),
    safeText_(order.notes),
    safeText_(order.status),
    safeText_(order.paymentMethod),
    safeText_(order.paymentStatus),
    safeText_(order.paymentReference),
    safeText_(order.razorpayPaymentId),
    safeText_(order.razorpayOrderId),
    safeText_(order.lastEvent),
    safeText_(order.visitorId),
    safeText_(order.sessionId),
  ];
}

function readOrders_() {
  var sheet = ensureSheet_(ORDERS_SHEET_NAME, ORDERS_HEADERS);
  var lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  var values = sheet
    .getRange(2, 1, lastRow - 1, ORDERS_HEADERS.length)
    .getValues();

  return values
    .map(mapOrderRow_)
    .filter(function (order) {
      return !!order.orderId;
    });
}

function readOrderAtRow_(sheet, rowIndex) {
  var values = sheet.getRange(rowIndex, 1, 1, ORDERS_HEADERS.length).getValues();
  return mapOrderRow_(values[0]);
}

function findOrderById_(orderId) {
  var normalizedOrderId = normalizeOrderId_(orderId);
  if (!normalizedOrderId) {
    return null;
  }

  var orders = readOrders_();
  for (var index = 0; index < orders.length; index += 1) {
    if (normalizeOrderId_(orders[index].orderId) === normalizedOrderId) {
      return orders[index];
    }
  }

  return null;
}

function mapOrderRow_(row) {
  return {
    orderId: safeText_(row[0]),
    createdAt: safeText_(row[1]),
    updatedAt: safeText_(row[2]),
    customerName: safeText_(row[3]),
    phone: safeText_(row[4]),
    email: safeText_(row[5]),
    productName: safeText_(row[6]),
    quantity: Number(row[7] || 0),
    address: safeText_(row[8]),
    notes: safeText_(row[9]),
    status: safeText_(row[10]),
    paymentMethod: safeText_(row[11]),
    paymentStatus: safeText_(row[12]),
    paymentReference: safeText_(row[13]),
    razorpayPaymentId: safeText_(row[14]),
    razorpayOrderId: safeText_(row[15]),
    lastEvent: safeText_(row[16]),
    visitorId: safeText_(row[17]),
    sessionId: safeText_(row[18]),
  };
}

function findOrderRowIndex_(sheet, orderId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return -1;
  }

  var columnValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (var index = 0; index < columnValues.length; index += 1) {
    if (normalizeOrderId_(columnValues[index][0]) === orderId) {
      return index + 2;
    }
  }

  return -1;
}

function requireAdminKey_(key) {
  if (safeText_(key) !== ADMIN_KEY) {
    throw new Error("Invalid admin key.");
  }
}

function visitFromGetParams_(e) {
  return {
    visitorId: getParam_(e, "visitorId", ""),
    sessionId: getParam_(e, "sessionId", ""),
    visitorEmail: getParam_(e, "visitorEmail", ""),
    visitedAt: getParam_(e, "visitedAt", ""),
    pagePath: getParam_(e, "pagePath", ""),
    pageTitle: getParam_(e, "pageTitle", ""),
    pageUrl: getParam_(e, "pageUrl", ""),
    referrer: getParam_(e, "referrer", ""),
    language: getParam_(e, "language", ""),
    screenSize: getParam_(e, "screenSize", ""),
    userAgent: getParam_(e, "userAgent", ""),
  };
}

function normalizeOrderId_(value) {
  return safeText_(value).toUpperCase();
}

function getParam_(e, key, fallbackValue) {
  var value =
    e && e.parameter && typeof e.parameter[key] !== "undefined"
      ? e.parameter[key]
      : fallbackValue;
  return safeText_(value);
}

function mergeObjects_(base, updates) {
  var result = {};
  var key;

  for (key in base) {
    if (base.hasOwnProperty(key)) {
      result[key] = base[key];
    }
  }

  for (key in updates) {
    if (updates.hasOwnProperty(key) && updates[key] !== "" && updates[key] != null) {
      result[key] = updates[key];
    }
  }

  return result;
}

function safeText_(value) {
  return value == null ? "" : String(value).trim();
}

function respond_(e, payload) {
  var callback =
    e && e.parameter && e.parameter.callback ? e.parameter.callback : "";
  var text = JSON.stringify(payload);

  if (callback) {
    return ContentService.createTextOutput(callback + "(" + text + ")").setMimeType(
      ContentService.MimeType.JAVASCRIPT,
    );
  }

  return ContentService.createTextOutput(text).setMimeType(
    ContentService.MimeType.JSON,
  );
}

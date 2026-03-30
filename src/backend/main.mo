import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type ProductId = Nat;
  type OrderId = Nat;

  type OrderStatus = {
    #orderPlaced;
    #processing;
    #dispatched;
    #delivered;
  };

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    imageUrl : Text;
    specs : Text;
    applications : Text;
  };

  public type Order = {
    id : OrderId;
    customerName : Text;
    phone : Text;
    email : Text;
    productName : Text;
    quantity : Nat;
    address : Text;
    notes : Text;
    createdAt : Time.Time;
    status : OrderStatus;
  };

  public type UserProfile = {
    name : Text;
  };

  func compareByProduct(a : Product, b : Product) : Order.Order {
    Nat.compare(a.id, b.id);
  };

  func compareByOrder(a : Order, b : Order) : Order.Order {
    Nat.compare(a.id, b.id);
  };

  let products = Map.empty<ProductId, Product>();
  let orders = Map.empty<OrderId, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var productIdCounter = 5; // Start after seeded products
  var orderIdCounter = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Seed initial products
  public shared ({ caller }) func _init() : async () {
    if (products.size() > 0) { return };
    let initialProducts = [
      {
        id = 1;
        name = "Valve Paper Bags";
        description = "High quality valve paper bags for industrial use.";
        imageUrl = "https://megabags.ltd/assets/images/posts/4c5e38e04bb6ae9e9f4725ab455155a95bfcba51.png";
        specs = "Available in various sizes and thicknesses.";
        applications = "Cement, chemicals, food products.";
      },
      {
        id = 2;
        name = "Open Mouth Paper Bags";
        description = "Durable open mouth paper bags.";
        imageUrl = "https://megabags.ltd/assets/images/posts/fcccab9bb8a110bb131407b763cd31a806c168ae.png";
        specs = "Multi-ply, customizable print options.";
        applications = "Agricultural products, grains, seeds.";
      },
      {
        id = 3;
        name = "Multiwall Paper Bags";
        description = "Heavy-duty multiwall paper bags.";
        imageUrl = "https://megabags.ltd/assets/images/posts/19a3b724b67b005b0a832b44452baa21f545fd21.png";
        specs = "Multiple layers for added strength.";
        applications = "Construction materials, minerals.";
      },
      {
        id = 4;
        name = "HDPE Laminated Paper Bags";
        description = "Paper bags with HDPE lamination for extra protection.";
        imageUrl = "https://megabags.ltd/assets/images/posts/1fecb352bc94cc9bb2671d090e5f3276eda009aa.png";
        specs = "Moisture resistant, tear proof.";
        applications = "Food, fertilizers, chemicals.";
      },
      {
        id = 5;
        name = "Aluminium Foil Bags";
        description = "Premium aluminium foil bags for sensitive products.";
        imageUrl = "https://megabags.ltd/assets/images/portfolio/ab067b0a8998eaaa7514f1be8b4834039a48e76a.png";
        specs = "Aluminium lining, air-tight seal.";
        applications = "Pharmaceuticals, electronics.";
      },
    ];

    for (product in initialProducts.values()) {
      products.add(product.id, product);
    };
  };

  // Products CRUD

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort(compareByProduct);
  };

  public query ({ caller }) func getProduct(id : ProductId) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func addProduct(product : Product) : async ProductId {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can add products");
    };
    let newProduct : Product = {
      product with
      id = productIdCounter;
    };
    products.add(productIdCounter, newProduct);
    productIdCounter += 1;
    newProduct.id;
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update products");
    };
    if (not products.containsKey(product.id)) {
      Runtime.trap("Product not found");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can delete products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  // Orders

  public shared ({ caller }) func createOrder(order : Order) : async OrderId {
    let newOrder : Order = {
      order with
      id = orderIdCounter;
      status = #orderPlaced : OrderStatus;
      createdAt = Time.now();
    };
    orders.add(orderIdCounter, newOrder);
    orderIdCounter += 1;
    newOrder.id;
  };

  public query ({ caller }) func getOrder(id : OrderId) : async Order {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can view orders");
    };
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can view all orders");
    };
    orders.values().toArray().sort(compareByOrder);
  };

  public shared ({ caller }) func updateOrderStatus(orderId : OrderId, status : OrderStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can update order status");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : Order = {
          order with
          status;
        };
        orders.add(orderId, updatedOrder);
      };
    };
  };
};

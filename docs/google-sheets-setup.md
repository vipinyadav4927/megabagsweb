# Google Sheet Setup

Is project me Google Sheet integration ready hai, lekin Google account permissions ki wajah se sheet ke andar script deploy aapki side se ek baar karna padega.

## Sheet me kya banega

- `Website Visits` tab
- `Online Orders` tab
- Dono tabs first request par auto headers ke saath create ho jayenge

## Step 1: Apps Script bind kijiye

1. Apni target sheet kholiye: `https://docs.google.com/spreadsheets/d/1zSF9hPqZjc60tFkr1tBLDduVyuBRvXVG6ZnRBNkkzJE/edit`
2. `Extensions` > `Apps Script` open kijiye
3. Wahan existing code hata kar [Code.gs](/c:/Users/HP/Desktop/TESTING/google-apps-script/Code.gs) ka content paste kijiye
4. `ADMIN_KEY` ko apne secret string se replace kijiye
5. Save kijiye

## Step 2: Web App deploy kijiye

1. `Deploy` > `New deployment`
2. Type: `Web app`
3. Execute as: `Me`
4. Who has access: `Anyone`
5. Deploy karke web app URL copy kar lijiye

Google ke official web app docs:

- https://developers.google.com/apps-script/guides/web

## Step 3: Frontend env.json update kijiye

File: [env.json](/c:/Users/HP/Desktop/TESTING/src/frontend/env.json)

Example:

```json
{
  "backend_host": "undefined",
  "backend_canister_id": "undefined",
  "project_id": "undefined",
  "ii_derivation_origin": "undefined",
  "google_sheets_webhook_url": "https://script.google.com/macros/s/DEPLOYMENT_ID/exec",
  "google_sheets_admin_key": "same-secret-as-Code-gs"
}
```

## Step 4: Build/Deploy

Frontend build ke time `env.json` automatically `dist/env.json` me copy ho jayega.

## Website me kya kaam karega

- Har page visit `Website Visits` tab me append hoga
- Har naya order `Online Orders` tab me save hoga
- Admin panel se status/payment update karne par wahi row update hogi
- `Track Order` page remote sheet se order dhoondh lega

## Important note

Visitor tab me exact insaan ka naam tabhi aayega jab website par login system ho. Abhi implementation `visitor_id`, `session_id`, browser info aur visited page log karti hai, jisse aapko pata chalega kitne visitors aaye aur kis page par gaye.

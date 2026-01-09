import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { HashRouter } from "react-router-dom";
import { loadFingerprinting } from "./utils/fingerprinting.js";
import { API_ROUTES } from "./utils/apiRoutes.js";

loadFingerprinting().then(async (fp) => {
  const fpResult = await fp.get();
  fetch(API_ROUTES.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deviceId: fpResult.visitorId }),
  });
});

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>
);

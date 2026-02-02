import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { webAuthnLogin } from "./utils/webAuth.js";
import { HashRouter } from "react-router-dom";
// import { loadFingerprinting } from "./utils/fingerprinting.js";
import { API_ROUTES } from "./utils/apiRoutes.js";

// Check if user already has auth cookie
const loggedIn = localStorage.getItem("loggedIn") === "true";
if (!loggedIn) {
  webAuthnLogin()
    .then(async (credentialId) => {
      try {
        await fetch(API_ROUTES.LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deviceId: credentialId }),
        });
        //const data = await response.json();
        //console.log("Login response:", data);
        localStorage.setItem("loggedIn", "true");
      } catch (error) {
        console.error("Login fetch error:", error);
        localStorage.setItem("loggedIn", "false");
      }
    })
    .catch((error) => {
      console.error("WebAuthn login failed:", error);
      localStorage.setItem("loggedIn", "false");
    });
}
// loadFingerprinting().then(async (fp) => {
//   const fpResult = await fp.get();
//   fetch(API_ROUTES.LOGIN, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ deviceId: fpResult.visitorId }),
//   });
// });

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>,
);

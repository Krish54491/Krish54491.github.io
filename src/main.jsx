import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { HashRouter } from "react-router-dom";

// const loggedIn = localStorage.getItem("loggedIn") === "true";
// if (!loggedIn) {
//   webAuthnLogin()
//     .then(async (credentialId) => {
//       try {
//         await fetch(API_ROUTES.LOGIN, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ deviceId: credentialId }),
//         });
//         //const data = await response.json();
//         //console.log("Login response:", data);
//         localStorage.setItem("loggedIn", "true");
//       } catch (error) {
//         console.error("Login fetch error:", error);
//         localStorage.setItem("loggedIn", "false");
//       }
//     })
//     .catch((error) => {
//       console.error("WebAuthn login failed:", error);
//       localStorage.setItem("loggedIn", "false");
//     });
// }

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>,
);

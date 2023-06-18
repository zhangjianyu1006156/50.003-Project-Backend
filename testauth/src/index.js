import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="312768833119-idhbsfq3k09r3dden70r2k8p9521f829.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

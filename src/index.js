import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Wrapping App component with AuthContextProvider component to get app-wide state coverage
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);

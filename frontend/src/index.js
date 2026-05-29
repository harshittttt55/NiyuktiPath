import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

// Global CSS (optional if you have one)
import "./styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

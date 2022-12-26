import ReactDom from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.js";

const root = ReactDom.createRoot(document.getElementById("main-container"));

root.render(<App />);

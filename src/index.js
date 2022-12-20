import ReactDom from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.js";

const root = ReactDom.createRoot(document.getElementById("root"));
// console.log(root)

root.render(<App />);

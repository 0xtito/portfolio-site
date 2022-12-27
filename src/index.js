import ReactDom from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.js";

// console.log(document.getElementsByTagName("div")[0]);

const root = ReactDom.createRoot(document.getElementsByTagName("div")[0]);

root.render(<App />);

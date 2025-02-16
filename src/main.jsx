import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import View from "./pages/view/view.jsx";
import About from "./pages/about/about.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view" element={<View />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);

import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Favorite from "../pages/favorite/Favorite";

export default function MainApp() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/favorite" element={<Favorite />} />
      </Routes>
    </Router>
  );
}

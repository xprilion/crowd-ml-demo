import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import ResultPage from "./pages/Results";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
    </Router>
  );
}
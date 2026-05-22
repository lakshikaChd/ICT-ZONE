import './bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Papers from "./pages/Papers";
import About from "./pages/About";
import Quizzes from "./pages/Quizzes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
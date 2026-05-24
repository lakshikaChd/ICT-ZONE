import './bootstrap';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Navigate එකත් එකතු කරගන්න

import Home from "./pages/Home";
import Papers from "./pages/Papers";
import About from "./pages/About";
import Quizzes from "./pages/Quizzes";

// Admin කොටස්
import AdminNav from "./components/AdminNav"; // <--- AdminNav එක මෙතනට Import කරගන්න
import Dashboard from "./pages/Admin/Dashboard";
import TutesMannage from "./pages/Admin/TutesMannage";
import QuizzesMannagement from "./pages/Admin/QuizzesMannagement";
import PapersMannagement from "./pages/Admin/PapersMannagement";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* සාමාන්‍ය පාරිභෝගික පිටු (Public Pages) */}
                <Route path="/" element={<Home />} />
                <Route path="/papers" element={<Papers />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/about" element={<About />} />

                {/* ================= ADMIN PANEL ROUTES (Nested) ================= */}
                {/* /admin කියන parent route එකට AdminNav එක Layout එකක් විදිහට දෙනවා */}
                <Route path="/admin" element={<AdminNav />}>
                    {/* කෙලින්ම /admin ආවොත් auto redirect වෙනවා /admin/dashboard වලට */}
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    
                    {/* මෙන්න AdminNav එක ඇතුළේ පෙන්වන sub-pages (Children) */}
                    <Route path="dashboard" element={<Dashboard />} />
                    
                    {/* ඉස්සරහට හදන Manage පිටු ටිකත් මෙතනටම දාන්න පුළුවන් */}
                    <Route path="tutes" element={<TutesMannage/>} />
                    <Route path="papers" element={<PapersMannagement/>} />
                    <Route path="quizzes" element={<QuizzesMannagement/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
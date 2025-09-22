// App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // <-- use BrowserRouter
import "./App.css";

import Login from "./Login";
import SignUp from "./SignUp";
import Home2 from "./Home2";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  return (
    <BrowserRouter basename="/lms"> {/* 👈 add basename here */}
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/login" element={<Login formData={formData} setFormData={setFormData} />} />
        <Route path="/signup" element={<SignUp formData={formData} setFormData={setFormData} />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

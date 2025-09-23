import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import SignUp from "./SignUp";
import Home2 from "./Home2";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  return (
    // ✅ basename must match the Vite base and Tomcat path
    <BrowserRouter basename="/frontapp1">
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/frontapp1/login" element={<Login formData={formData} setFormData={setFormData} />} />
        <Route path="/frontapp1/signup" element={<SignUp formData={formData} setFormData={setFormData} />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

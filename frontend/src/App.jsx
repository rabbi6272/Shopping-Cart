import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import { useAdminStore } from "./store/store";

import HomePage from "./pages/Home.jsx";
import UpdatePage from "./pages/Update.jsx";
import CreatePage from "./pages/Create.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";

import Navbar from "./components/navbar.jsx";

import "./app.css";

export default function App() {
  const admin = useAdminStore((state) => state.admin);
  const setAdmin = useAdminStore((state) => state.setAdmin);

  useEffect(() => {
    async function login() {
      const response = await fetch("http://localhost:5000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      const data = await response.json();
      if (data.success === true && data.message === "Already logged in") {
        setAdmin(true);
      }
    }
    login();
  }, [admin, setAdmin]);

  return (
    <div className="h-auto min-h-screen font-nunito bg-gray-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/update" element={<UpdatePage />} />
        <Route path="/admin/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

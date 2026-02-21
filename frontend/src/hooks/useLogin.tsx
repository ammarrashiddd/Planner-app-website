import { useState } from "react";
import { useNavigate } from "react-router";

type Inputs = {
  username: string;
  password: string;
};

export default function useLogin() {
  const [popUpLogin, setPopupLogin] = useState(false);
  const [popupApi, setPopupApi] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (data: Inputs) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Cek apakah response berupa JSON sebelum di-parse
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server did not return JSON");
      }

      const result = await response.json();

      if (response.ok) {
        // Gunakan nama key yang konsisten dengan backend (contoh: result.token)
        localStorage.setItem("authToken", result.accessToken || result.token);
        localStorage.setItem("username", result.username); 
        navigate("/dashboard");
      } else {
        setPopupLogin(true);
        setTimeout(() => setPopupLogin(false), 3000); 
      }
    } catch (error) {
      console.error("Login Error:", error);
      setPopupApi(true);
      setTimeout(() => setPopupApi(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    popUpLogin,
    setPopupLogin,
    popupApi,
    setPopupApi,
    loading,
  };
}
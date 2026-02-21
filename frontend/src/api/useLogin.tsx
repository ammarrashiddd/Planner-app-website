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

      const result = await response.json();

      if (response.ok) {
        // Simpan token (pastikan backend mengirim key 'accessToken')
        localStorage.setItem("authToken", result.accessToken);
        // Opsional: Simpan username untuk sapaan di Dashboard
        localStorage.setItem("username", result.username); 
        
        navigate("/dashboard");
      } else {
        // Trigger popup error login (username/pass salah)
        setPopupLogin(true);
        setTimeout(() => setPopupLogin(false), 3000); 
      }
    } catch (error) {
      // Trigger popup error API (server mati/network error)
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
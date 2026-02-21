import { useState } from "react"
import { useNavigate } from "react-router"

type Inputs = {
  username: string
  password: string
  repeatPassword?: string 
}

export default function useRegister() {
  const [popUpLogin, setPopupLogin] = useState(false)
  const [popupApi, setPopupApi] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (data: Inputs) => {
    try {
      setLoading(true)
      const { username, password } = data
      const payload = { username, password }

      const response = await fetch("http://localhost:3000/register", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      // Tambahkan ini untuk berjaga-jaga jika ada error dari server
      const result = await response.json().catch(() => ({}));

      if (response.ok) { 
        navigate("/login") 
      } else {
        // Kamu bisa log result.message untuk debugging
        console.log("Register failed:", result.message);
        setPopupLogin(true) 
        setTimeout(() => setPopupLogin(false), 3000)
      }
    } catch (error) {
      setPopupApi(true)
      setTimeout(() => setPopupApi(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return {
    handleRegister,
    popUpLogin,
    setPopupLogin,
    popupApi,
    setPopupApi,
    loading,
    setLoading,
  }
}
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

      // Memisahkan repeatPassword agar tidak ikut masuk ke database
      const { username, password } = data
      const payload = { username, password }

      // PERUBAHAN: Gunakan endpoint '/register' yang ada di server.js kamu
      const response = await fetch("/api/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      })


      if (response.ok) { 
        // Berhasil! Arahkan ke halaman login
        navigate("/login") 
      } else {
        // Gagal (misalnya username sudah dipakai)
        setPopupLogin(true) // Kamu bisa gunakan popup ini untuk error validasi
        setTimeout(() => setPopupLogin(false), 3000)
      }
    } catch (error) {
      // Masalah koneksi ke server
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
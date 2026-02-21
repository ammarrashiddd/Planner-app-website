import { WarningIcon, XIcon, Eye, EyeSlash } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"
import useLogin from "../../api/useLogin"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useNavigate } from "react-router"
import loginImg from "../../assets/images/loginImage.jpg";

export default function LoginForm() {
  const { handleLogin, popUpLogin, popupApi, loading, setPopupLogin, setPopupApi } = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const schema = z.object({
    username: z.string().min(4, "Username minimal 4 karakter"),
    password: z.string().min(8, "Password minimal 8 karakter")
  })

  type formData = z.infer<typeof schema>

  const form = useForm<formData>({
    resolver: zodResolver(schema)
  })

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white text-[#0d0d0d] font-sans overflow-hidden">
      
      {/* Sisi Kiri: Gambar dengan Overlay Minimalis */}
      <div className="hidden md:block flex-1 p-4">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <img 
            src={loginImg} 
            alt="Login" 
            className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute top-10 left-10">
            <p className="text-2xl font-black tracking-tighter uppercase leading-none">Planner.</p>
          </div>
          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back.</h2>
            <p className="opacity-70 text-sm font-medium">Lanjutkan produktivitasmu hari ini.</p>
          </div>
        </div>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20 relative">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <button 
              onClick={() => navigate("/")} 
              className="text-xs font-bold uppercase tracking-widest mb-8 hover:underline cursor-pointer"
            >
              ← Back to home
            </button>
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Login</h1>
            <p className="text-gray-400 font-medium">Masuk, Atur, Wujudkan.</p>
          </div>

          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
            {/* Input Username */}
            <div className="group relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-black transition-colors">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                {...form.register("username")}
                className="w-full border-b border-gray-200 focus:border-black outline-none py-2 transition-all duration-300 placeholder:text-gray-200 font-medium"
              />
              {form.formState.errors.username && (
                <p className="absolute -bottom-5 text-[10px] font-bold text-red-500 uppercase tracking-tighter">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            {/* Input Password */}
            <div className="group relative">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-black transition-colors">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...form.register("password")}
                  className="w-full border-b border-gray-200 focus:border-black outline-none py-2 transition-all duration-300 placeholder:text-gray-200 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors cursor-pointer"
                >
                  {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="absolute -bottom-5 text-[10px] font-bold text-red-500 uppercase tracking-tighter">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-sm ${
                loading 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-[#0d0d0d] text-white hover:bg-gray-800 active:scale-[0.98]"
              }`}
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>

          <p className="mt-12 text-center text-sm text-gray-400 font-medium">
            Don't have an account?{" "}
            <span 
              onClick={() => navigate("/register")} 
              className="text-black font-bold cursor-pointer hover:underline underline-offset-4"
            >
              Register
            </span>
          </p>
        </div>

        {/* Notifikasi / Pop-up Floating */}
        <div className="absolute top-6 right-6 flex flex-col gap-3 z-50">
          {(popUpLogin || popupApi) && (
            <div className="bg-black text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-[fadeIn_.3s_ease-out]">
              <div className="bg-red-500 p-2 rounded-lg">
                <WarningIcon size={20} weight="bold" color="white" />
              </div>
              <div className="pr-8">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Error Notice</p>
                <p className="text-sm font-bold">
                  {popUpLogin ? "Invalid Credentials" : "API Connection Failed"}
                </p>
              </div>
              <button 
                onClick={() => { setPopupLogin(false); setPopupApi(false); }} 
                className="hover:opacity-50 transition-opacity cursor-pointer"
              >
                <XIcon size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
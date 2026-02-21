import { WarningIcon, XIcon, Eye, EyeSlash } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useRegister from "../../hooks/useRegister"
import { useState } from "react"
import { useNavigate } from "react-router"
import registerImg from "../../assets/images/loginImage.jpg";

export default function RegisterForm() {
  const { handleRegister, popUpLogin, popupApi, loading, setPopupLogin, setPopupApi } = useRegister()
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const navigate = useNavigate()

  const schema = z.object({
    username: z.string().min(4, "Username Minimal 4 Karakter"),
    password: z.string()
      .min(8, "Password Minimal 8 Karakter")
      .regex(/[A-Z]/, "Minimal harus ada 1 Huruf Kapital")
      .regex(/[0-9]/, "Minimal Harus Ada 1 Angka"),
    repeatPassword: z.string().min(8, "Password Minimal 8 Karakter")
  }).refine((data) => data.password === data.repeatPassword, {
    message: "Password Dan Repeat Password Harus Sama",
    path: ["repeatPassword"]
  })

  type formData = z.infer<typeof schema>

  const form = useForm<formData>({
    resolver: zodResolver(schema)
  })

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-white text-[#0d0d0d] font-sans overflow-hidden">
      
      {/* Left Side: Image */}
      <div className="hidden md:block flex-1 p-4">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
           <img 
            src={registerImg} 
            alt="Register" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-10 left-10 text-white">
            <p className="text-2xl font-bold tracking-tighter">Start your journey.</p>
            <p className="opacity-80 text-sm">Minimalism is the key to focus.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-20">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <button 
              onClick={() => navigate("/")} 
              className="text-xs font-bold uppercase tracking-widest mb-8 hover:underline cursor-pointer"
            >
              ← Back to home
            </button>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Register</h1>
            <p className="text-gray-500 font-medium">Bergabung, Atur, Wujudkan.</p>
          </div>

          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-5">
            {/* Username */}
            <div className="space-y-1">
              <label className="text-xs font-black uppercase tracking-wider">Username</label>
              <input
                type="text"
                placeholder="Enter Your Username"
                {...form.register("username")}
                className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-3 transition-colors placeholder:text-gray-300"
              />
              {form.formState.errors.username && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1 relative">
              <label className="text-xs font-black uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...form.register("password")}
                  className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-3 transition-colors placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
                >
                  {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            {/* Repeat Password */}
            <div className="space-y-1 relative">
              <label className="text-xs font-black uppercase tracking-wider">Repeat Password</label>
              <input
                type={showRepeatPassword ? "text" : "password"}
                placeholder="••••••••"
                {...form.register("repeatPassword")}
                className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-3 transition-colors placeholder:text-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
              >
                {showRepeatPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
              </button>
              {form.formState.errors.repeatPassword && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight">
                  {form.formState.errors.repeatPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-6 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                loading 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-[#0d0d0d] text-white hover:bg-gray-800 hover:shadow-xl active:scale-95"
              }`}
            >
              {loading ? "Processing..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Sudah punya akun?{" "}
            <span 
              onClick={() => navigate("/login")} 
              className="text-black font-bold cursor-pointer hover:underline"
            >
              Login di sini
            </span>
          </p>
        </div>
      </div>

      {/* Notifications Layer */}
      <div className="fixed top-6 right-6 flex flex-col gap-3 z-100">
        {popUpLogin && (
          <div className="bg-black text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-4">
            <div className="bg-red-500 p-2 rounded-lg">
              <WarningIcon size={20} weight="bold" color="white" />
            </div>
            <div className="pr-8">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Error</p>
              <p className="text-sm font-bold">Username/Password Incorrect</p>
            </div>
            <button onClick={() => setPopupLogin(false)} className="hover:opacity-50 cursor-pointer">
              <XIcon size={20} />
            </button>
          </div>
        )}

        {popupApi && (
          <div className="bg-black text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-right-4">
            <div className="bg-red-500 p-2 rounded-lg">
              <WarningIcon size={20} weight="bold" color="white" />
            </div>
            <div className="pr-8">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">API Error</p>
              <p className="text-sm font-bold">Server connection failed</p>
            </div>
            <button onClick={() => setPopupApi(false)} className="hover:opacity-50 cursor-pointer">
              <XIcon size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
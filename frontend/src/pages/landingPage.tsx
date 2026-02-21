import { useNavigate } from "react-router";

export default function LearnMore() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Streamlined Scheduling",
      desc: "Kelola waktu dengan presisi. Dari agenda harian hingga visi jangka panjang, semua dalam satu kendali.",
    },
    {
      title: "Minimalist Note-taking",
      desc: "Tangkap ide saat itu juga. Antarmuka bersih tanpa distraksi untuk menjaga alur berpikirmu.",
    },
    {
      title: "Progress Analytics",
      desc: "Visualisasi pencapaian yang jujur. Lihat bagaimana produktivitasmu berkembang setiap harinya.",
    },
    {
      title: "Seamless Sync",
      desc: "Akses rencana Anda di mana saja, kapan saja. Fokus pada eksekusi, bukan pada sinkronisasi.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0d0d0d] font-sans selection:bg-[#0d0d0d] selection:text-white">
      <nav className="fixed top-0 w-full px-6 py-4 flex flex-row justify-between items-center bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <p className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => navigate("/")}>
          Planner.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate("/login")} 
            className="text-sm font-bold hover:underline underline-offset-4 transition-all"
          >
            Login
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="py-2 px-5 rounded-full text-white text-sm font-bold bg-[#0d0d0d] hover:opacity-80 transition-all"
          >
            Join Now
          </button>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-6 flex flex-col items-center">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
            DISIPLIN ADALAH <br /> <span className="text-gray-400">KEBEBASAN BARU.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto font-medium leading-relaxed">
            Hapus kebisingan visual. Fokus pada apa yang penting. Platform kami dirancang untuk mereka yang menghargai esensi daripada dekorasi.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {features.map((f, i) => (
            <div key={i} className="group border-b border-[#0d0d0d] pb-8 transition-all hover:pl-4">
              <span className="text-xs font-bold text-gray-400 mb-4 block tracking-[0.2em]">0{i + 1}</span>
              <h2 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h2>
              <p className="text-gray-600 leading-relaxed max-w-md">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto border-l-4 border-[#0d0d0d] pl-8 md:pl-16">
          <p className="text-3xl md:text-4xl font-medium leading-tight mb-6 italic">
            "Produktivitas bukan tentang melakukan lebih banyak hal, tapi tentang melakukan hal yang benar dengan ruang mental yang tenang."
          </p>
          <p className="text-sm font-black uppercase tracking-widest">— Editorial Board, Productivity Weekly</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto bg-[url('/src/assets/images/landingPageImage.jpg')] bg-cover bg-center text-white p-12 md:p-24 rounded-3xl flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Mulai langkah pertamamu.</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate("/register")}
              className="bg-white text-[#0d0d0d] py-4 px-10 rounded-full font-bold text-lg hover:bg-gray-200 transition-all"
            >
              Daftar Gratis
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-100 flex flex-col items-center">
        <p className="text-[10px] font-bold tracking-[0.5em] text-gray-400 uppercase">
          Planner System &copy; 2026 — All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
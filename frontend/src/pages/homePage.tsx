import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Calendar from "../components/calendar/calendar";
import useGetActivities from "../hooks/useGetActivities";
import usePostActivities from "../hooks/usePostActivities";
import useDeleteActivities from "../hooks/useDeleteActivities";
import { SquareHalfIcon, XIcon } from "@phosphor-icons/react";

interface UserData {
  username: string | null;
  token: string | null;
}

export default function Dashboard() {
  // STATES
  const [sidebarCalendar, setSidebarCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  const navigate = useNavigate();

  // Ambil identitas dari localStorage
  const auth: UserData = {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("authToken"),
  };

  // Hooks
  const {fetchActivities, activities, loading, error} = useGetActivities(auth)

  const {handleAddTask, newTask, setNewTask} = usePostActivities(auth, fetchActivities, selectedDate)

  const {handleDelete} = useDeleteActivities(auth, fetchActivities)

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id)
    setShowDeletePopup(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      handleDelete(deleteId)
      setShowDeletePopup(false)
      setDeleteId(null)
    }
  }

  if (loading) return <div className="p-10 text-center font-bold">Loading...</div>;

  const filteredActivities = activities.filter(act => act.date === selectedDate);

  return (
    <div className="flex flex-row">
      {/* left section */}
      <div className="min-h-screen bg-white text-[#0d0d0d] font-sans p-4 md:p-6 flex flex-2 flex-col">
        {/* Header Section */}
        <header className="w-full flex justify-between items-end border-b-2 border-black pb-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">My Planner.</h1>
            <p className="text-xs font-bold text-gray-400 mb-5">USER: {auth.username?.toUpperCase()}</p>
            <button onClick={handleLogout} className="text-xs font-black hover:bg-red-600 hover:text-white border-2 border-black px-4 py-2 transition-all rounded-md">
              LOGOUT
            </button>
          </div>
          <button onClick={() => setSidebarCalendar(true)} className="flex items-start justify-center h-full"><SquareHalfIcon size={40} /></button>
        </header>

        <main className="w-full">
          <div className="mb-4">
             <h2 className="text-sm font-black uppercase text-gray-400">Planning for:</h2>
             <p className="text-lg md:text-xl font-bold">{selectedDate}</p>
          </div>
          {/* Input Section */}
          <form onSubmit={handleAddTask} className="flex gap-4 mb-12 flex-col sm:flex-row">
            <input 
              type="text" 
              placeholder="Ada rencana apa hari ini?" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 bg-transparent border-b-2 border-gray-200 focus:border-black outline-none py-2 text-md md:text-xl transition-all"
            />
            <button className="bg-black text-white px-8 py-2 font-bold hover:invert transition-all border-2">
              ADD
            </button>
          </form>

          {error && <p className="text-red-500 mb-4 font-bold">{error}</p>}

          {/* List Section */}
          <div className="grid gap-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((act) => (
                <div key={act.id} className="group flex items-center justify-between p-6 border-2 border-gray-100 hover:border-black transition-all">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      {act.status}
                    </span>
                    <h3 className="text-xl font-bold">{act.task}</h3>
                  </div>
                  
                  <button 
                    onClick={() => confirmDelete(act.id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-100 text-red-600 p-2 text-xs font-black hover:bg-red-600 hover:text-white transition-all"
                  >
                    DELETE
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-widest">No activities found.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* right section */}
      {sidebarCalendar && 
        <div className="flex flex-1 flex-col w-70 h-screen bg-white absolute md:static top-0 right-0 border-2 border-gray-200">
          <button onClick={() => setSidebarCalendar(false)} className="px-3 md:px-6 mt-6"><XIcon size={32} weight="bold"/></button>
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} activities={activities} />
        </div>     
      }

      {/* Delete Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 border-4">
          <div className="bg-white p-6 rounded shadow-xl w-80">
            <h2 className="text-lg font-bold mb-4">Hapus rencana ini?</h2>
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Ya
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
}
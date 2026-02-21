import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react"
import { useState } from "react"

export default function Calendar({ selectedDate, setSelectedDate, activities }: any) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    const todayDate = new Date()
    const todayString = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

    return (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
            {/* Header: Bulan & Navigasi */}
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex flex-col">
                    <span className="text-gray-400 text-xs font-black uppercase tracking-widest">{year}</span>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tighter">
                        {currentDate.toLocaleString("default", { month: "long" })}
                    </h2>
                </div>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-all active:scale-90">
                        <ArrowLeftIcon size={22} weight="bold" />
                    </button>
                    <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-xl transition-all active:scale-90">
                        <ArrowRightIcon size={22} weight="bold" />
                    </button>
                </div>
            </div>

            {/* Body: Grid Kalender */}
            <div className="grid grid-cols-7 gap-y-2">
                {/* Nama Hari */}
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="text-[10px] font-black text-gray-300 text-center uppercase tracking-widest mb-2">
                        {d}
                    </div>
                ))}

                {/* Padding awal bulan */}
                {Array(firstDay).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} className="h-12 w-12" />
                ))}

                {/* Tanggal */}
                {days.map(day => {
                    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const isSelected = selectedDate === fullDate;
                    const isToday = todayString === fullDate;
                    const hasActivity = activities.some((a: any) => a.date === fullDate);

                    return (
                        <div key={day} className="relative flex items-center justify-center">
                            <button
                                onClick={() => setSelectedDate(fullDate)}
                                className={`
                                    h-11 w-11 flex flex-col items-center justify-center rounded-2xl text-sm font-bold transition-all duration-200
                                    ${isSelected 
                                        ? "bg-black text-white shadow-lg shadow-black/30 scale-110" 
                                        : isToday 
                                            ? "bg-blue-50 text-blue-600 border-2 border-blue-100" 
                                            : "hover:bg-gray-100 text-gray-700"
                                    }
                                `}
                            >
                                {day}
                                
                                {/* Dot Indicator */}
                                {hasActivity && (
                                    <div className={`
                                        absolute bottom-1.5 w-1 h-1 rounded-full
                                        ${isSelected ? "bg-white" : "bg-blue-500"}
                                    `} />
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
            
            {/* Footer Info */}
            <div className="mt-6 pt-6 border-t border-gray-50 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2">
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Activity</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-black" />
                    <span>Selected</span>
                </div>
            </div>
        </div>
    )
}
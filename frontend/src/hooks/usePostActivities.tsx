import { useState } from "react";

export default function usePostActivities(auth: any,fetchActivities: any, selectedDate: any ) {
    const [newTask, setNewTask] = useState<string>("");

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
    
        try {
          const res = await fetch("/api/activities", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
               task: newTask,
               date: selectedDate
              }),
          });
    
          if (res.ok) {
            setNewTask("");
            fetchActivities(); // Refresh list setelah tambah
          }
        } catch (err) {
          alert("Gagal menambah rencana");
        }
      };
    return {
        handleAddTask,
        newTask,
        setNewTask
    }
}
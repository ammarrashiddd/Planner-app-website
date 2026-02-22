import { useState } from "react";
import { useNavigate } from "react-router";

interface Activity {
  id: number;
  userId: number;
  task: string;
  date: string;
  status: "In Progress" | "Done";
}

export default function useGetActivities(auth: any) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const fetchActivities = async () => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("/api/activities", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data: Activity[] = await res.json();
        setActivities(data);
      } else if (res.status === 401 || res.status === 403) {
        // Token tidak valid atau expired
        handleLogout();
      }
    } catch (err) {
      setError("Gagal menyambung ke server.");
    } finally {
      setLoading(false);
    }
  };

    return {
        fetchActivities,
        activities,
        loading,
        error
    }
}
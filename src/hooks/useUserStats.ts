import { useEffect, useState } from "react";
import { api } from "./useAPI";

interface UserStats {
  xp: number;
  level: number;
  completedLessons: number;
  earnedBadges: number;
}

export function useUserStats() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/user/stats");
        setStats(response.data);
      } catch (err: any) {
        console.error("Erro ao buscar estatísticas:", err);
        setError("Erro ao carregar estatísticas");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

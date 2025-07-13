import { useEffect, useState } from "react";
import { api } from "./useAPI";

interface ProgressItem {
  moduleId: string;
  lessonId?: string;
  completed: boolean;
}

export const useProgressAPI = () => {
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await api.get("/user/progress");
        setProgress(response.data);
      } catch (error) {
        console.error("Erro ao buscar progresso:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  return { progress, loading };
};

import { useState, useEffect } from "react";
import { mockModules, mockLessons } from "../data/mockData";
import { api } from "./useAPI";

export const useModules = () => {
  return {
    modules: mockModules,
    loading: false,
    error: null,
  };
};

export const useUserProgress = () => {
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

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

  const completeLesson = async (moduleId: string, lessonId: string) => {
    try {
      await api.post("/user/progress/complete", {
        moduleId,
        lessonId,
      });

      // Atualiza o progresso localmente para refletir no front
      setProgress((prev) => [...prev, { moduleId, lessonId, completed: true }]);
    } catch (error) {
      console.error("Erro ao concluir a aula:", error);
    }
  };

  return { progress, loading, completeLesson };
};

export const useUserBadges = () => {
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await api.get("/user/badges");
        setBadges(response.data);
      } catch (error) {
        console.error("Erro ao buscar badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  return { badges, loading };
};

export const useModuleLessons = (moduleId: number) => {
  const lessons = mockLessons.filter((lesson) => lesson.moduleId === moduleId);

  return {
    lessons,
    loading: false,
    error: null,
  };
};

export const useLesson = (lessonId: number) => {
  const lesson = mockLessons.find((l) => l.id === lessonId);

  return {
    lesson,
    loading: false,
    error: null,
  };
};

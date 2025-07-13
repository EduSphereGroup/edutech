import { useEffect, useState } from "react";
import { api } from "./useAPI";
import { PersonalizedModule } from "../data/personalizedContent";

interface UsePersonalizedModulesOptions {
  grade: string;
  subject: string;
  difficulty: string;
}

export const usePersonalizedModules = ({
  grade,
  subject,
  difficulty
}: UsePersonalizedModulesOptions) => {
  const [modules, setModules] = useState<PersonalizedModule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!grade || !subject || !difficulty) return;

    const fetchModules = async () => {
      setLoading(true);
      try {
        const response = await api.get("/user/modules", {
          params: { grade, subject, difficulty },
        });
        setModules(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar módulos personalizados:", err);
        setError("Erro ao buscar módulos");
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [grade, subject, difficulty]);

  return { modules, loading, error };
};

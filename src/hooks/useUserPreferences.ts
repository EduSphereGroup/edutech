import { useState, useEffect } from "react";
import { api } from "./useAPI";

interface Preferences {
  grade: string;
  subject: string;
  difficulty: string;
  completedOnboarding: boolean;
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get("/user/preferences");
        if (response.data) {
          setPreferences(response.data);
        } else {
          setPreferences(null);
        }
      } catch (err) {
        console.error("Erro ao buscar preferências:", err);
        setPreferences(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const savePreferences = async (data: Preferences) => {
    try {
      await api.post("/user/preferences", data);
      setPreferences(data);
    } catch (err) {
      console.error("Erro ao salvar preferências:", err);
    }
  };

  return { preferences, loading, savePreferences };
}

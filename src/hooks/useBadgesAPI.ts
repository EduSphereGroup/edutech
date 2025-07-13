import { useEffect, useState } from "react";
import { api } from "./useAPI";

export const useBadgesAPI = () => {
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

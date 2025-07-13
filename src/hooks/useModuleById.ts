import { useEffect, useState } from "react";
import { api } from "./useAPI";

export const useModuleById = (id: string, p0: { grade: string; subject: string; difficulty: string; }) => {
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchModule = async () => {
      try {
        const response = await api.get(`/user/modules/${id}`);
        setModule(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Erro ao buscar módulo");
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  return { module, loading, error };
};

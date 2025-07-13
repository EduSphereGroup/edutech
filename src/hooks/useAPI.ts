// src/hooks/useAPI.ts
import axios from "axios";
import { getAuth } from "firebase/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token de autenticação adicionado:", token);
  }
  return config;
});

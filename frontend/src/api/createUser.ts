import api from "@/lib/api";

export const createUser = async (email: string, password: string) => {
  const response = await api.post("/api/auth/register", { email, password });
  return response.data;
};


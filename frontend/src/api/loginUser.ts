import api from "@/lib/api";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('api/auth/login', { email, password }, {
      withCredentials: true,
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('Failed to log in user');
  }
};


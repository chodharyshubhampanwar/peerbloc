import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginUser } from "@/api/loginUser";

interface FormInput {
  email: string;
  password: string;
}

export function useLoginUser(): UseMutationResult<any, unknown, FormInput> {
  return useMutation({
    mutationFn: async (data: FormInput) => {
      const { email, password } = data;
      return loginUser(email, password);
    },
  });
}


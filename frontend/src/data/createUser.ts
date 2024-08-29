import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { createUser } from "@/api/createUser";

interface FormInput {
  email: string;
  password: string;
}

export function useCreateUser(): UseMutationResult<any, unknown, FormInput> {
  return useMutation({
    mutationFn: async (data: FormInput) => {
      const { email, password } = data;
      return createUser(email, password);
    },
  });
}


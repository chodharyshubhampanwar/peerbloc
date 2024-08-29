// import create from 'zustand';
// import jwt from 'jsonwebtoken';

// interface AuthState {
//   token: string | null;
//   user: any | null;
//   setToken: (token: string | null) => void;
//   decodeToken: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   user: null,
//   setToken: (token) => set({ token }),
//   decodeToken: () => {
//     set((state) => {
//       if (state.token) {
//         try {
//           const decodedToken = jwt.verify(state.token, process.env.JWT_SECRET as string);
//           return { user: decodedToken };
//         } catch (error) {
//           return { user: null };
//         }
//       }
//       return { user: null };
//     });
//   },
// }));


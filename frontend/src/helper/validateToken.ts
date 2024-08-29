import { jwtVerify} from "jose";

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

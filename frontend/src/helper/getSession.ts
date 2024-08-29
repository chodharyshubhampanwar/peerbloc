// import { cookies } from "next/headers";
// import { jwtVerify, JWTPayload } from "jose";
// import { validateToken } from "@/helper/validateToken";

// export async function getSession() {
//   const sessionCookie = cookies().get("token")?.value;
//   if (!sessionCookie) {
//     return null;
//   }

//   const isValid = await validateToken(sessionCookie);

//   if (!isValid) {
//     return null;
//   }

//   const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
//   const { payload } = await jwtVerify(sessionCookie, secret);
//   return payload as JWTPayload;
// }

import { cookies } from "next/headers";
import { jwtVerify, JWTPayload } from "jose";
import { validateToken } from "@/helper/validateToken";

export async function getSession() {
  const sessionCookie = cookies().get("token")?.value;
  if (!sessionCookie) {
    return null;
  }

  const isValid = await validateToken(sessionCookie);

  if (!isValid) {
    return null;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  try {
    const { payload } = await jwtVerify(sessionCookie, new TextEncoder().encode(secret));
    return payload as JWTPayload;
  } catch (err) {
    console.error("Failed to verify JWT", err);
    return null;
  }
}

import jwt from "jsonwebtoken";

export const authenticate = async (request, reply) => {
  const token = request.cookies.token;

  if (!token) {
    reply.code(401).send({ error: "Authentication required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
  } catch (error) {
    reply.code(401).send({ error: "Invalid token" });
    return;
  }
};

export const errorHandler = (error, request, reply) => {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  reply.code(statusCode).send({
    error: {
      message,
      statusCode,
    },
  });
};

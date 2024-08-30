export const createUserSchema = {
  body: {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
      username: { type: "string", minLength: 3 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 6 },
    },
    additionalProperties: false,
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

export const updateUserSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  body: {
    type: "object",
    properties: {
      username: { type: "string", minLength: 3 },
      email: { type: "string", format: "email" },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

export const getUserSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

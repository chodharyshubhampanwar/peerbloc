let users = [];
let nextId = 1;

export const createUser = async (userData) => {
  const newUser = { id: String(nextId++), ...userData };
  users.push(newUser);
  return newUser;
};

export const findUsers = async () => {
  return users;
};

export const findUserById = async (id) => {
  return users.find((user) => user.id === id);
};

export const updateUserById = async (id, userData) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...userData };
  return users[index];
};

export const deleteUserById = async (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return null;
  const deletedUser = users[index];
  users.splice(index, 1);
  return deletedUser;
};

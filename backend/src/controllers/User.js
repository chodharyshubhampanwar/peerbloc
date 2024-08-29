import { prisma } from "../db/db.js";

export const createUser = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      bio,
      profilePicture,
      universityId,
      graduationYear,
    } = req.body;

    const user = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        bio,
        profilePicture,
        universityId,
        graduationYear,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

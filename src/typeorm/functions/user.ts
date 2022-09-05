import "reflect-metadata";
import { connect } from "../config";
import { User } from "../entities/User";

export const createUser = async (email: string): Promise<User | void> => {
  try {
    const connection = await connect();

    const repo = connection.getRepository(User);

    const newUser: User = new User();
    newUser.email = email;
    newUser.createdAt = new Date();

    const savedUser: User = await repo.save(newUser);

    return savedUser;
  } catch (err) {
    console.error(err);
  }
};

export const getUsers = async (userId?: number, email?: string) => {
  const connection = await connect();
  const userRepo = connection.getRepository(User);

  let allUsers;
  if (!userId && !email) {
    allUsers = await userRepo.find();
  } else if (!!userId && !email) {
    allUsers = await userRepo.find({ where: { id: userId } });
  } else if (!userId && !!email) {
    allUsers = await userRepo.find({ where: { email } });
  } else {
    console.error("Unable to fetch user data");
  }

  return allUsers;
};

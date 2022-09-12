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

export const getUsers = async (
  email?: string,
  userId?: number
): Promise<User[]> => {
  const connection = await connect();
  const userRepo = connection.getRepository(User);

  let userData;
  if (!userId && !email) {
    userData = await userRepo.find();
  } else if (!!userId && !email) {
    userData = await userRepo.findOne({ where: { id: userId } });
  } else if (!userId && !!email) {
    userData = await userRepo.findOne({ where: { email } });
  } else {
    console.error("Unable to fetch user data");
  }

  return Array.isArray(userData) ? userData : ([userData] as User[]);
};

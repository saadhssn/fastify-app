import { AppDataSource } from '../db';
import { User } from '../entities/User';

export const userService = {
  getAllUsers: async () => {
    return await AppDataSource.getRepository(User).find();
  },
  
  createUser: async (name: string, email: string) => {
    const user = new User();
    user.name = name;
    user.email = email;

    await AppDataSource.getRepository(User).save(user);
    return user;
  }
};

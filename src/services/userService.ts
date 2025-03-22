import { AppDataSource } from '../db';
import { User } from '../entities/User';

export const userService = {
  getAllUsers: async () => {
    return await AppDataSource.getRepository(User).find();
  },

  createUser: async (username: string, name: string, firstName: string, lastName: string, emailAddress: string, phoneNumber: string, password: string, boardCount: string, role: string, location?: string, profilePicture?: string) => {
    const user = new User();
    user.username = username;
    user.name = name;
    user.firstName = firstName;
    user.lastName = lastName;
    user.emailAddress = emailAddress;
    user.phoneNumber = phoneNumber;
    user.password = password;
    user.boardCount = boardCount;
    user.role = role;
    user.location = location || null;
    user.profilePicture = profilePicture || null;

    await AppDataSource.getRepository(User).save(user);
    return user;
  }
};

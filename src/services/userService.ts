// UserService class containing methods for user sign-up and login functionality.
// The signUpUser function registers a new user and creates a profile for them.
// The loginUser function handles the user authentication and JWT token generation.

import { AppDataSource } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
import { EntityManager } from "typeorm";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private profileRepository = AppDataSource.getRepository(Profile);

  /**
   * Sign up function to create a new user and a profile.
   * It hashes the password and stores user data in both User and Profile entities.
   * @param username - The unique username for the user.
   * @param firstName - The first name of the user.
   * @param lastName - The last name of the user.
   * @param email - The unique email address for the user.
   * @param phoneNumber - The unique phone number of the user.
   * @param password - The password of the user to be hashed.
   * @param role - The role assigned to the user (e.g., 'admin', 'user').
   * @param location - (Optional) The location of the user.
   * @param profilePicture - (Optional) The URL of the user's profile picture.
   * @returns A success message and the created user and profile.
   */
  async signUpUser(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: string,
    location?: string,
    profilePicture?: string
  ) {
    return await AppDataSource.transaction(async (transactionalEntityManager: EntityManager) => {
      // Check if user already exists
      const existingUser = await transactionalEntityManager.findOne(User, { where: { emailAddress: email } });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const name = `${firstName} ${lastName}`;

      // Create and save User
      const newUser = transactionalEntityManager.create(User, {
        username,
        name,
        firstName,
        lastName,
        emailAddress: email,
        phoneNumber,
        password: hashedPassword,
        role: role.toLowerCase(),
        location: location || null,
        profilePicture: profilePicture || null,
      });

      await transactionalEntityManager.save(User, newUser);

      // Create and save Profile (using same ID as User)
      const newProfile = transactionalEntityManager.create(Profile, {
        id: newUser.id, // Ensuring profile ID matches user ID
        username,
        name,
        firstName,
        lastName,
        emailAddress: email,
        phoneNumber,
        role: role.toLowerCase(),
        location: location || null,
        profilePicture: profilePicture || null,
      });

      await transactionalEntityManager.save(Profile, newProfile);

      return {
        message: "User and Profile created successfully",
        user: newUser,
        profile: newProfile,
      };
    });
  }
  
  /**
   * Login function to authenticate the user and generate a JWT token.
   * @param username - The username of the user attempting to log in.
   * @param password - The password entered by the user.
   * @returns A success message with the generated JWT token and user details.
   */
  async loginUser(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new Error("Invalid credentials!");
    }

    if (!user.status) {
      throw new Error("Account is inactive!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials!");
    }

    const token = jwt.sign(
      { role: user.role, userId: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return {
      message: "Authentication successful!",
      token,
      user: {
        id: user.id,
        username: user.username,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        location: user.location,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        status: user.status,
      },
    };
  }
}

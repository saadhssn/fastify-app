import { AppDataSource } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
import { EntityManager } from "typeorm";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private profileRepository = AppDataSource.getRepository(Profile);

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

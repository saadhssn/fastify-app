import { AppDataSource } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { Role } from "../entities/Role";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private roleRepository = AppDataSource.getRepository(Role);

  async signUpUser(
    username: string,
    name: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    roleName: string,
    location?: string,
    profilePicture?: string
  ) {
    const existingUser = await this.userRepository.findOne({ where: { emailAddress: email } });
    if (existingUser) {
      throw new Error("User already exists");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    // const role = await this.roleRepository.findOne({ where: { name: roleName } });
  
    // if (!role) {
    //   throw new Error(`Role '${roleName}' not found`);
    // }
  
    const newUser = this.userRepository.create({
      username,
      name,
      firstName,
      lastName,
      emailAddress: email,
      phoneNumber,
      password: hashedPassword,
      role: roleName, // Store only the role name as a string
      location: location || null,
      profilePicture: profilePicture || null,
    });
  
    return await this.userRepository.save(newUser);
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

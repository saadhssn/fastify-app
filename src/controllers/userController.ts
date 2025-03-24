// User controller handling sign up for both admin and user (advertiser) accounts, as well as user login functionality.

import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/userService";

const userService = new UserService();

export const userController = {
  // Signup function for creating an admin account
  async signUpAdmin(req: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        username,
        name,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        location,
        profilePicture,
      } = req.body as {
        username: string;
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        location?: string;
        profilePicture?: string;
      };

      // Calls the UserService to sign up an admin with the provided data
      const newUser = await userService.signUpUser(
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        "admin", 
        location,
        profilePicture
      );

      // Sends success response after successful user creation
      reply.status(201).send({ message: "Admin account created", user: newUser });
    } catch (error) {
      // Handles any error that occurs and sends an error message
      reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  },

  // Signup function for creating a user (advertiser) account
  async signUpUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        location,
        profilePicture,
      } = req.body as {
        username: string;
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        boardCount: string; 
        location?: string;
        profilePicture?: string;
      };

      // Calls the UserService to sign up a user with the provided data
      const newUser = await userService.signUpUser(
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        "user", // user role is set to user
        location,
        profilePicture
      );

      // Sends success response after successful user creation
      reply.status(201).send({ message: "Advertiser account created", user: newUser });
    } catch (error) {
      // Handles any error that occurs and sends an error message
      reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  },

  // Login function for user authentication
  async login(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { username, password } = req.body as { username: string; password: string };

      // Calls the UserService to authenticate the user
      const response = await userService.loginUser(username, password);

      // Sends response with the authentication result
      reply.status(200).send(response);
    } catch (error) {
      // Handles any error that occurs and sends an error message
      reply.status(400).send({ error: error instanceof Error ? error.message : "An error occurred" });
    }
  },
};

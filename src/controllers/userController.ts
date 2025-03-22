import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/userService";

const userService = new UserService();

export const userController = {
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

      const newUser = await userService.signUpUser(
        username,
        name,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        "admin",
        location,
        profilePicture
      );

      reply.status(201).send({ message: "Admin account created", user: newUser });
    } catch (error) {
      reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  },

  async signUpUser(req: FastifyRequest, reply: FastifyReply) {
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
        boardCount: string;
        location?: string;
        profilePicture?: string;
      };

      const newUser = await userService.signUpUser(
        username,
        name,
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        "user",
        location,
        profilePicture
      );

      reply.status(201).send({ message: "Advertiser account created", user: newUser });
    } catch (error) {
      reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  },
};

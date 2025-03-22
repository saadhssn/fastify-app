import { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../services/userService';

export const userController = {
  getUsers: async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await userService.getAllUsers();
    return reply.send(users);
  },

  createUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const { username, name, firstName, lastName, emailAddress, phoneNumber, password, boardCount, role, location, profilePicture } = request.body as {
      username: string,
      name: string,
      firstName: string,
      lastName: string,
      emailAddress: string,
      phoneNumber: string,
      password: string,
      boardCount: string,
      role: string,
      location?: string,
      profilePicture?: string
    };

    const newUser = await userService.createUser(username, name, firstName, lastName, emailAddress, phoneNumber, password, boardCount, role, location, profilePicture);
    
    return reply.status(201).send(newUser);
  }
};

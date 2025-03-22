import { FastifyRequest, FastifyReply } from 'fastify';
import { userService } from '../services/userService';

export const userController = {
  getUsers: async (request: FastifyRequest, reply: FastifyReply) => {
    const users = await userService.getAllUsers();
    return reply.send(users);
  },

  createUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email } = request.body as { name: string, email: string };
    const newUser = await userService.createUser(name, email);
    return reply.status(201).send(newUser);
  }
};

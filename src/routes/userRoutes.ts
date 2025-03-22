import { FastifyInstance } from 'fastify';
import { userController } from '../controllers/userController';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users', {
    schema: {
        description: 'Get users',
        tags: ['Demo'],
        summary: 'Fetch all users from the database',
        response: {
          200: {
            description: "Success Response",
            type: 'object',
            properties: {
              hello: { type: "string" }
            }
          }
        }
    }
  }, userController.getUsers);

  fastify.post('/users', userController.createUser);
};

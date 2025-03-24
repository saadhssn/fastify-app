import { FastifyInstance } from 'fastify';
import { getDesignCategories } from '../services/airtableSync';

export const designRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/design-category', async (request, reply) => {
    try {
      const categories = await getDesignCategories();
      reply.send({ success: true, data: categories });
    } catch (error) {
      reply.status(500).send({ success: false, message: 'Internal Server Error' });
    }
  });
};

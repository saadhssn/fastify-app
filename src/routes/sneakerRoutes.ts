import { FastifyInstance } from 'fastify';
import { getSneakerBySlug } from '../services/airtableSync';

export const sneakerRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/sneaker/:sneakerSlug', async (request, reply) => {
    try {
      const { sneakerSlug } = request.params as { sneakerSlug: string };

      const sneaker = await getSneakerBySlug(sneakerSlug);

      if (!sneaker) {
        return reply.status(404).send({ message: 'Sneaker not found' });
      }

      return reply.send(sneaker);
    } catch (error) {
      return reply.status(500).send({ message: 'Internal Server Error' });
    }
  });
};

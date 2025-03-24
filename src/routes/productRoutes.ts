import { FastifyInstance } from 'fastify';
import { getProductTypes } from '../services/airtableSync';

export async function productRoutes(fastify: FastifyInstance) {
  fastify.get('/product-types', async (request, reply) => {
    try {
      const productTypes = await getProductTypes();
      return reply.send({ success: true, data: productTypes });
    } catch (error) {
      return reply.status(500).send({ success: false, message: 'Error fetching product types' });
    }
  });
}

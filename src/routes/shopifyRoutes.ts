import { FastifyInstance } from 'fastify';
import { shopifyController } from '../controllers/shopifyController';

export const shopifyRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/create-product', shopifyController.createProduct);
  fastify.post('/create-cart', shopifyController.createCart);
};

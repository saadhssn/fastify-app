import { FastifyReply, FastifyRequest } from 'fastify';
import ShopifyService from '../services/shopifyService';

export const shopifyController = {
  // Handle product creation
  async createProduct(req: FastifyRequest, reply: FastifyReply) {
    try {
      // Log the incoming request body
      console.log('Received create-product request with body:', req.body);

      const productInput = req.body as { title: string; productOptions: any[] };

      // Log the product input before passing to the service
      console.log('Product Input:', productInput);

      const response = await ShopifyService.createProduct(productInput);

      console.log('Product created successfully, response:', response);

      reply.status(200).send({ message: 'Product created successfully', data: response });
    } catch (error) {
      console.error('Error creating product:', error);
      reply.status(400).send({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },

  // Handle cart creation
  async createCart(req: FastifyRequest, reply: FastifyReply) {
    try {
      // Log the incoming request body
      console.log('Received create-cart request with body:', req.body);

      const cartInput = req.body as { lines: { quantity: number; merchandiseId: string }[] };

      // Log the cart input before passing to the service
      console.log('Cart Input:', cartInput);

      const response = await ShopifyService.createCart(cartInput);

      console.log('Cart created successfully, response:', response);

      reply.status(200).send({ message: 'Cart created successfully', data: response });
    } catch (error) {
      console.error('Error creating cart:', error);
      reply.status(400).send({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  },
};

// Product routes for fetching product types from Airtable and returning them as a response.

import { FastifyInstance } from 'fastify';
import { getProductTypes } from '../services/airtableSync';
import { productController } from "../controllers/productController";


export async function productRoutes(fastify: FastifyInstance) {

  fastify.post("/products", productController.addProduct);
  fastify.get("/products", productController.getAllProducts);
  fastify.get("/products/:id", productController.getProductById);
  fastify.put("/products/:id", productController.updateProduct);
  fastify.delete("/products/:id", productController.deleteProduct);

  fastify.get('/product-types', async (request, reply) => {
    try {
      const productTypes = await getProductTypes(); // Fetch product types from Airtable service
      return reply.send({ success: true, data: productTypes }); // Return the product types in the response
    } catch (error) {
      return reply.status(500).send({ success: false, message: 'Error fetching product types' }); // Error handling for product types fetching
    }
  });
}

// Design routes for fetching design categories from Airtable and returning them as a response.

import { FastifyInstance } from 'fastify';
import { getDesignCategories } from '../services/airtableSync';
import { sneakerController } from "../controllers/sneakerController";


export const designRoutes = async (fastify: FastifyInstance) => {

  fastify.post("/designs", sneakerController.addSneaker);
  fastify.get("/designs", sneakerController.getAllSneakers);
  fastify.get("/designs/:id", sneakerController.getSneakerById);
  fastify.put("/designs/:id", sneakerController.updateSneaker);
  fastify.delete("/designs/:id", sneakerController.deleteSneaker);

  fastify.get('/design-category', async (request, reply) => {
    try {
      const categories = await getDesignCategories(); // Fetch categories from Airtable service
      reply.send({ success: true, data: categories }); // Return the categories in the response
    } catch (error) {
      reply.status(500).send({ success: false, message: 'Internal Server Error' }); // Error handling for server issues
    }
  });
};

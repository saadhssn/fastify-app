// Design routes for fetching design categories from Airtable and returning them as a response.

import { FastifyInstance } from 'fastify';
import { getDesignCategories } from '../services/airtableSync';
import { designController } from "../controllers/designController";


export const designRoutes = async (fastify: FastifyInstance) => {

  fastify.post("/designs", designController.addDesign);
  fastify.get("/designs", designController.getAllDesigns);
  fastify.get("/designs/:id", designController.getDesignById);
  fastify.put("/designs/:id", designController.updateDesign);
  fastify.delete("/designs/:id", designController.deleteDesign);

  fastify.get('/design-category', async (request, reply) => {
    try {
      const categories = await getDesignCategories(); // Fetch categories from Airtable service
      reply.send({ success: true, data: categories }); // Return the categories in the response
    } catch (error) {
      reply.status(500).send({ success: false, message: 'Internal Server Error' }); // Error handling for server issues
    }
  });
};

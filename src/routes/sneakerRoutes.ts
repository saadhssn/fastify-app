// Sneaker routes for fetching sneaker details by slug from Airtable and returning them as a response.

import { FastifyInstance } from 'fastify';
import { getSneakerBySlug } from '../services/airtableSync';
import { sneakerController } from "../controllers/sneakerController";


export const sneakerRoutes = async (fastify: FastifyInstance) => {

  fastify.post("/sneakers", sneakerController.addSneaker);
  fastify.get("/sneakers", sneakerController.getAllSneakers);
  fastify.get("/sneakers/:id", sneakerController.getSneakerById);
  fastify.put("/sneakers/:id", sneakerController.updateSneaker);
  fastify.delete("/sneakers/:id", sneakerController.deleteSneaker);

  fastify.get('/sneaker/:sneakerSlug', async (request, reply) => {
    try {
      const { sneakerSlug } = request.params as { sneakerSlug: string }; // Extract sneaker slug from the URL params

      const sneaker = await getSneakerBySlug(sneakerSlug); // Fetch sneaker details by slug

      if (!sneaker) {
        return reply.status(404).send({ message: 'Sneaker not found' }); // Handle case when sneaker is not found
      }

      return reply.send(sneaker); // Send sneaker details in the response
    } catch (error) {
      return reply.status(500).send({ message: 'Internal Server Error' }); // Error handling for server issues
    }
  });
};

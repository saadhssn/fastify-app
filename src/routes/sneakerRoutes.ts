// Sneaker routes for fetching sneaker details by slug from Airtable and returning them as a response.

import { FastifyInstance } from 'fastify';
import { getSneakerBySlug } from '../services/airtableSync';
import { sneakerController } from "../controllers/sneakerController";
import { Type } from "@sinclair/typebox";


const SneakerSchema = Type.Object({
  sneaker: Type.String(),
  imageThumbnail: Type.String(),
  status: Type.String(),
  publishStatus: Type.String(),
  mkPublishStatus: Type.String(),
  brand: Type.String(),
  name: Type.String(),
  colorway: Type.String(),
  shopifyLiveLink: Type.String(),
  shopifyLiveLinkMatchKicks: Type.String(),
  baseProductSetNew: Type.String(),
  baseProductSetNewName: Type.String(),
  baseProductSet: Type.String(),
  colors: Type.Array(Type.String()), // Array of color variations
  mkShopifyHandle: Type.String(),
  airTableId: Type.String(),
  isForTestStore: Type.String(),
  allowedShirtColorsOld06112024: Type.String(),
  nameFromBaseProductSet: Type.String(),
  serialNumber: Type.String(),
  generateNumber: Type.String(),
  allowedShirtColorsOld13112024: Type.String(),
})

export const sneakerRoutes = async (fastify: FastifyInstance) => {

  fastify.post(
    "/sneakers",
    {
      schema: {
        body: SneakerSchema, 
        response: {
          201: Type.Object({
            message: Type.String(),
            sneaker: SneakerSchema,
          }),
        },
      },
    },
    sneakerController.addSneaker
  );

  fastify.get("/sneakers", sneakerController.getAllSneakers);
  fastify.get("/sneakers/:id", sneakerController.getSneakerById);

  fastify.put(
    "/sneakers/:id",
    {
      schema: {
        body: SneakerSchema, 
        response: {
          200: Type.Object({
            message: Type.String(),
            sneaker: SneakerSchema,
          }),
        },
      },
    },
    sneakerController.updateSneaker
  );
  
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

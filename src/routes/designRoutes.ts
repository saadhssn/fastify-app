// Design routes for fetching design categories from Airtable and returning them as a response.

import { FastifyInstance } from 'fastify';
import { getDesignCategories } from '../services/airtableSync';
import { designController } from "../controllers/designController";
import { Type } from "@sinclair/typebox";


const DesignSchema = Type.Object({
  svg: Type.Optional(Type.String()),
  preview: Type.Optional(Type.String()),
  svgHats: Type.Optional(Type.String()),
  previewHats: Type.Optional(Type.String()),
  svgJoggers: Type.Optional(Type.String()),
  previewJoggers: Type.Optional(Type.String()),
  brands: Type.Optional(Type.String()),
  designer: Type.Optional(Type.String()),
  logoFullFromBrands: Type.Optional(Type.String()),
  licenses: Type.Optional(Type.String()),
  editLink: Type.Optional(Type.String()),
  designStatus: Type.Optional(Type.String()),
  publishStatus: Type.Optional(Type.String()),
  tags: Type.Optional(Type.String()),
  googleMcc: Type.Optional(Type.String()),
  source: Type.Optional(Type.String()),
  nameFromDesigner: Type.Optional(Type.String()),
  layeredBy: Type.Optional(Type.String()),
  nameFromLayeredBy: Type.Optional(Type.String()),
  dateCreated: Type.Optional(Type.String()),
  layerIdHats: Type.Optional(Type.Array(Type.String())),
  layerDisplayHats: Type.Optional(Type.Array(Type.String())),
  layerIdJoggers: Type.Optional(Type.Array(Type.String())),
  layerDisplayJoggers: Type.Optional(Type.Array(Type.String())),
  layerId: Type.Optional(Type.Array(Type.String())),
  layerDisplay: Type.Optional(Type.Array(Type.String())),
  feedback: Type.Optional(Type.String()),
  shopifyId: Type.Optional(Type.String()),
  shopifyHandle: Type.Optional(Type.String()),
  errorLog: Type.Optional(Type.String()),
  designDescription: Type.Optional(Type.String()),
  seoTitle: Type.Optional(Type.String()),
  dateModified: Type.Optional(Type.String()),
  svgFillType: Type.Optional(Type.String()),
  s3Id: Type.Optional(Type.String()),
  s3Url: Type.Optional(Type.String()),
  airTableId: Type.Optional(Type.String()),
  popularity: Type.Optional(Type.String()),
  sortOrder: Type.Optional(Type.String()),
  mkShopifyId: Type.Optional(Type.String()),
  mkShopifyHandle: Type.Optional(Type.String()),
  nameFromBrands: Type.Optional(Type.String()),
  age: Type.Optional(Type.String()),
  siteUrl: Type.Optional(Type.String()),
  liveLink: Type.Optional(Type.String()),
  gender: Type.Optional(Type.String()),
  auditDone: Type.Optional(Type.String()),
  shopifyEditLink: Type.Optional(Type.String()),
  quickArchive: Type.Optional(Type.String()),
  recId: Type.Optional(Type.String()),
  status: Type.Optional(Type.String()),
  link: Type.Optional(Type.String()),
  tagInShopify: Type.Optional(Type.String()),
  mostPopularDesign: Type.Optional(Type.String()),
});

export const designRoutes = async (fastify: FastifyInstance) => {

  fastify.post(
    "/designs",
    {
      schema: {
        body: DesignSchema, 
        response: {
          201: Type.Object({
            message: Type.String(),
            design: DesignSchema,
          }),
        },
      },
    },
    designController.addDesign
  );

  fastify.get("/designs", designController.getAllDesigns);
  fastify.get("/designs/:id", designController.getDesignById);

  fastify.put(
    "/desgins/:id",
    {
      schema: {
        body: DesignSchema, 
        response: {
          200: Type.Object({
            message: Type.String(),
            sneaker: DesignSchema,
          }),
        },
      },
    },
    designController.updateDesign
  );

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

// Product routes for fetching product types from Airtable and returning them as a response.

import { FastifyInstance } from 'fastify';
import { getProductTypes } from '../services/airtableSync';
import { productController } from "../controllers/productController";
import { Type } from "@sinclair/typebox";


const ProductSchema = Type.Object({
  imageFile: Type.Optional(Type.String()),
  firstMock: Type.Optional(Type.String()),
  usSizesInStock: Type.Optional(Type.String()),
  activeMockups: Type.Optional(Type.String()),
  firstMockAirTableId: Type.Optional(Type.String()),
  airTableRecordId: Type.Optional(Type.String()),
  swatchColor: Type.Optional(Type.String()),
  parentProduct: Type.Optional(Type.String()),
  printType: Type.Optional(Type.String()),
  combinedSizeInfo: Type.Optional(Type.String()),
  productDetails: Type.Optional(Type.String()),
  sizeAndProductInformation: Type.Optional(Type.String()),
  statusFromParentProduct: Type.Optional(Type.String()),
  dataStoreKey: Type.Optional(Type.String()),
  brand: Type.Optional(Type.String()),
  model: Type.Optional(Type.String()),
  productColor: Type.Optional(Type.String()),
  printFulProductColor: Type.Optional(Type.String()),
  productType: Type.Optional(Type.String()),
  status: Type.Optional(Type.String()),
  availableOn: Type.Optional(Type.String()),
  description: Type.Optional(Type.String()),
  dateCreated: Type.Optional(Type.String()),
  originalAllImages: Type.Optional(Type.String()),
  productSets: Type.Optional(Type.String()),
  shopifyHandleFromProductSets: Type.Optional(Type.String()),
  colorTypeFromProductSets: Type.Optional(Type.String()),
  topLeftXCoordinate: Type.Optional(Type.String()),
  topLeftYCoordinate: Type.Optional(Type.String()),
  designWidth: Type.Optional(Type.String()),
  regularPrice: Type.Optional(Type.String()),
  salePrice: Type.Optional(Type.String()),
  pricingOkay: Type.Optional(Type.String()),
  printfulProductId: Type.Optional(Type.String()),
  productAudit: Type.Optional(Type.String()),
  auditFixed: Type.Optional(Type.String()),
});


export async function productRoutes(fastify: FastifyInstance) {

  fastify.post(
    "/products",
    {
      schema: {
        body: ProductSchema, 
        response: {
          201: Type.Object({
            message: Type.String(),
            design: ProductSchema,
          }),
        },
      },
    },
    productController.addProduct
  );

  fastify.get("/products", productController.getAllProducts);
  fastify.get("/products/:id", productController.getProductById);

  fastify.put(
    "/products/:id",
    {
      schema: {
        body: ProductSchema, 
        response: {
          200: Type.Object({
            message: Type.String(),
            sneaker: ProductSchema,
          }),
        },
      },
    },
    productController.updateProduct
  );
  
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

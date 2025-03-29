"use strict";
// Product routes for fetching product types from Airtable and returning them as a response.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = productRoutes;
const airtableSync_1 = require("../services/airtableSync");
const productController_1 = require("../controllers/productController");
const typebox_1 = require("@sinclair/typebox");
const ProductSchema = typebox_1.Type.Object({
    imageFile: typebox_1.Type.Optional(typebox_1.Type.String()),
    firstMock: typebox_1.Type.Optional(typebox_1.Type.String()),
    usSizesInStock: typebox_1.Type.Optional(typebox_1.Type.String()),
    activeMockups: typebox_1.Type.Optional(typebox_1.Type.String()),
    firstMockAirTableId: typebox_1.Type.Optional(typebox_1.Type.String()),
    airTableRecordId: typebox_1.Type.Optional(typebox_1.Type.String()),
    swatchColor: typebox_1.Type.Optional(typebox_1.Type.String()),
    parentProduct: typebox_1.Type.Optional(typebox_1.Type.String()),
    printType: typebox_1.Type.Optional(typebox_1.Type.String()),
    combinedSizeInfo: typebox_1.Type.Optional(typebox_1.Type.String()),
    productDetails: typebox_1.Type.Optional(typebox_1.Type.String()),
    sizeAndProductInformation: typebox_1.Type.Optional(typebox_1.Type.String()),
    statusFromParentProduct: typebox_1.Type.Optional(typebox_1.Type.String()),
    dataStoreKey: typebox_1.Type.Optional(typebox_1.Type.String()),
    brand: typebox_1.Type.Optional(typebox_1.Type.String()),
    model: typebox_1.Type.Optional(typebox_1.Type.String()),
    productColor: typebox_1.Type.Optional(typebox_1.Type.String()),
    printFulProductColor: typebox_1.Type.Optional(typebox_1.Type.String()),
    productType: typebox_1.Type.Optional(typebox_1.Type.String()),
    status: typebox_1.Type.Optional(typebox_1.Type.String()),
    availableOn: typebox_1.Type.Optional(typebox_1.Type.String()),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    dateCreated: typebox_1.Type.Optional(typebox_1.Type.String()),
    originalAllImages: typebox_1.Type.Optional(typebox_1.Type.String()),
    productSets: typebox_1.Type.Optional(typebox_1.Type.String()),
    shopifyHandleFromProductSets: typebox_1.Type.Optional(typebox_1.Type.String()),
    colorTypeFromProductSets: typebox_1.Type.Optional(typebox_1.Type.String()),
    topLeftXCoordinate: typebox_1.Type.Optional(typebox_1.Type.String()),
    topLeftYCoordinate: typebox_1.Type.Optional(typebox_1.Type.String()),
    designWidth: typebox_1.Type.Optional(typebox_1.Type.String()),
    regularPrice: typebox_1.Type.Optional(typebox_1.Type.String()),
    salePrice: typebox_1.Type.Optional(typebox_1.Type.String()),
    pricingOkay: typebox_1.Type.Optional(typebox_1.Type.String()),
    printfulProductId: typebox_1.Type.Optional(typebox_1.Type.String()),
    productAudit: typebox_1.Type.Optional(typebox_1.Type.String()),
    auditFixed: typebox_1.Type.Optional(typebox_1.Type.String()),
});
function productRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/products", {
            schema: {
                body: ProductSchema,
                response: {
                    201: typebox_1.Type.Object({
                        message: typebox_1.Type.String(),
                        design: ProductSchema,
                    }),
                },
            },
        }, productController_1.productController.addProduct);
        fastify.get("/products", productController_1.productController.getAllProducts);
        fastify.get("/products/:id", productController_1.productController.getProductById);
        fastify.put("/products/:id", {
            schema: {
                body: ProductSchema,
                response: {
                    200: typebox_1.Type.Object({
                        message: typebox_1.Type.String(),
                        sneaker: ProductSchema,
                    }),
                },
            },
        }, productController_1.productController.updateProduct);
        fastify.delete("/products/:id", productController_1.productController.deleteProduct);
        fastify.get('/product-types', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productTypes = yield (0, airtableSync_1.getProductTypes)(); // Fetch product types from Airtable service
                return reply.send({ success: true, data: productTypes }); // Return the product types in the response
            }
            catch (error) {
                return reply.status(500).send({ success: false, message: 'Error fetching product types' }); // Error handling for product types fetching
            }
        }));
    });
}

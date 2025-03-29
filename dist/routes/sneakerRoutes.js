"use strict";
// Sneaker routes for fetching sneaker details by slug from Airtable and returning them as a response.
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
exports.sneakerRoutes = void 0;
const airtableSync_1 = require("../services/airtableSync");
const sneakerController_1 = require("../controllers/sneakerController");
const typebox_1 = require("@sinclair/typebox");
const SneakerSchema = typebox_1.Type.Object({
    sneaker: typebox_1.Type.String(),
    imageThumbnail: typebox_1.Type.String(),
    status: typebox_1.Type.String(),
    publishStatus: typebox_1.Type.String(),
    mkPublishStatus: typebox_1.Type.String(),
    brand: typebox_1.Type.String(),
    name: typebox_1.Type.String(),
    colorway: typebox_1.Type.String(),
    shopifyLiveLink: typebox_1.Type.String(),
    shopifyLiveLinkMatchKicks: typebox_1.Type.String(),
    baseProductSetNew: typebox_1.Type.String(),
    baseProductSetNewName: typebox_1.Type.String(),
    baseProductSet: typebox_1.Type.String(),
    colors: typebox_1.Type.Array(typebox_1.Type.String()), // Array of color variations
    mkShopifyHandle: typebox_1.Type.String(),
    airTableId: typebox_1.Type.String(),
    isForTestStore: typebox_1.Type.String(),
    allowedShirtColorsOld06112024: typebox_1.Type.String(),
    nameFromBaseProductSet: typebox_1.Type.String(),
    serialNumber: typebox_1.Type.String(),
    generateNumber: typebox_1.Type.String(),
    allowedShirtColorsOld13112024: typebox_1.Type.String(),
});
const sneakerRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/sneakers", {
        schema: {
            body: SneakerSchema,
            response: {
                201: typebox_1.Type.Object({
                    message: typebox_1.Type.String(),
                    sneaker: SneakerSchema,
                }),
            },
        },
    }, sneakerController_1.sneakerController.addSneaker);
    fastify.get("/sneakers", sneakerController_1.sneakerController.getAllSneakers);
    fastify.get("/sneakers/:id", sneakerController_1.sneakerController.getSneakerById);
    fastify.put("/sneakers/:id", {
        schema: {
            body: SneakerSchema,
            response: {
                200: typebox_1.Type.Object({
                    message: typebox_1.Type.String(),
                    sneaker: SneakerSchema,
                }),
            },
        },
    }, sneakerController_1.sneakerController.updateSneaker);
    fastify.delete("/sneakers/:id", sneakerController_1.sneakerController.deleteSneaker);
    fastify.get('/sneaker/:sneakerSlug', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { sneakerSlug } = request.params; // Extract sneaker slug from the URL params
            const sneaker = yield (0, airtableSync_1.getSneakerBySlug)(sneakerSlug); // Fetch sneaker details by slug
            if (!sneaker) {
                return reply.status(404).send({ message: 'Sneaker not found' }); // Handle case when sneaker is not found
            }
            return reply.send(sneaker); // Send sneaker details in the response
        }
        catch (error) {
            return reply.status(500).send({ message: 'Internal Server Error' }); // Error handling for server issues
        }
    }));
});
exports.sneakerRoutes = sneakerRoutes;

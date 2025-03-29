"use strict";
// Design routes for fetching design categories from Airtable and returning them as a response.
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
exports.designRoutes = void 0;
const airtableSync_1 = require("../services/airtableSync");
const designController_1 = require("../controllers/designController");
const typebox_1 = require("@sinclair/typebox");
const DesignSchema = typebox_1.Type.Object({
    svg: typebox_1.Type.Optional(typebox_1.Type.String()),
    preview: typebox_1.Type.Optional(typebox_1.Type.String()),
    svgHats: typebox_1.Type.Optional(typebox_1.Type.String()),
    previewHats: typebox_1.Type.Optional(typebox_1.Type.String()),
    svgJoggers: typebox_1.Type.Optional(typebox_1.Type.String()),
    previewJoggers: typebox_1.Type.Optional(typebox_1.Type.String()),
    brands: typebox_1.Type.Optional(typebox_1.Type.String()),
    designer: typebox_1.Type.Optional(typebox_1.Type.String()),
    logoFullFromBrands: typebox_1.Type.Optional(typebox_1.Type.String()),
    licenses: typebox_1.Type.Optional(typebox_1.Type.String()),
    editLink: typebox_1.Type.Optional(typebox_1.Type.String()),
    designStatus: typebox_1.Type.Optional(typebox_1.Type.String()),
    publishStatus: typebox_1.Type.Optional(typebox_1.Type.String()),
    tags: typebox_1.Type.Optional(typebox_1.Type.String()),
    googleMcc: typebox_1.Type.Optional(typebox_1.Type.String()),
    source: typebox_1.Type.Optional(typebox_1.Type.String()),
    nameFromDesigner: typebox_1.Type.Optional(typebox_1.Type.String()),
    layeredBy: typebox_1.Type.Optional(typebox_1.Type.String()),
    nameFromLayeredBy: typebox_1.Type.Optional(typebox_1.Type.String()),
    dateCreated: typebox_1.Type.Optional(typebox_1.Type.String()),
    layerIdHats: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    layerDisplayHats: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    layerIdJoggers: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    layerDisplayJoggers: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    layerId: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    layerDisplay: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String())),
    feedback: typebox_1.Type.Optional(typebox_1.Type.String()),
    shopifyId: typebox_1.Type.Optional(typebox_1.Type.String()),
    shopifyHandle: typebox_1.Type.Optional(typebox_1.Type.String()),
    errorLog: typebox_1.Type.Optional(typebox_1.Type.String()),
    designDescription: typebox_1.Type.Optional(typebox_1.Type.String()),
    seoTitle: typebox_1.Type.Optional(typebox_1.Type.String()),
    dateModified: typebox_1.Type.Optional(typebox_1.Type.String()),
    svgFillType: typebox_1.Type.Optional(typebox_1.Type.String()),
    s3Id: typebox_1.Type.Optional(typebox_1.Type.String()),
    s3Url: typebox_1.Type.Optional(typebox_1.Type.String()),
    airTableId: typebox_1.Type.Optional(typebox_1.Type.String()),
    popularity: typebox_1.Type.Optional(typebox_1.Type.String()),
    sortOrder: typebox_1.Type.Optional(typebox_1.Type.String()),
    mkShopifyId: typebox_1.Type.Optional(typebox_1.Type.String()),
    mkShopifyHandle: typebox_1.Type.Optional(typebox_1.Type.String()),
    nameFromBrands: typebox_1.Type.Optional(typebox_1.Type.String()),
    age: typebox_1.Type.Optional(typebox_1.Type.String()),
    siteUrl: typebox_1.Type.Optional(typebox_1.Type.String()),
    liveLink: typebox_1.Type.Optional(typebox_1.Type.String()),
    gender: typebox_1.Type.Optional(typebox_1.Type.String()),
    auditDone: typebox_1.Type.Optional(typebox_1.Type.String()),
    shopifyEditLink: typebox_1.Type.Optional(typebox_1.Type.String()),
    quickArchive: typebox_1.Type.Optional(typebox_1.Type.String()),
    recId: typebox_1.Type.Optional(typebox_1.Type.String()),
    status: typebox_1.Type.Optional(typebox_1.Type.String()),
    link: typebox_1.Type.Optional(typebox_1.Type.String()),
    tagInShopify: typebox_1.Type.Optional(typebox_1.Type.String()),
    mostPopularDesign: typebox_1.Type.Optional(typebox_1.Type.String()),
});
const designRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
    fastify.post("/designs", {
        schema: {
            body: DesignSchema,
            response: {
                201: typebox_1.Type.Object({
                    message: typebox_1.Type.String(),
                    design: DesignSchema,
                }),
            },
        },
    }, designController_1.designController.addDesign);
    fastify.get("/designs", designController_1.designController.getAllDesigns);
    fastify.get("/designs/:id", designController_1.designController.getDesignById);
    fastify.put("/desgins/:id", {
        schema: {
            body: DesignSchema,
            response: {
                200: typebox_1.Type.Object({
                    message: typebox_1.Type.String(),
                    sneaker: DesignSchema,
                }),
            },
        },
    }, designController_1.designController.updateDesign);
    fastify.delete("/designs/:id", designController_1.designController.deleteDesign);
    fastify.get('/design-category', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield (0, airtableSync_1.getDesignCategories)(); // Fetch categories from Airtable service
            reply.send({ success: true, data: categories }); // Return the categories in the response
        }
        catch (error) {
            reply.status(500).send({ success: false, message: 'Internal Server Error' }); // Error handling for server issues
        }
    }));
});
exports.designRoutes = designRoutes;

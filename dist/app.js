"use strict";
// This is the main Fastify server file that initializes and configures the Fastify server,
// integrates Swagger for API documentation, connects to the PostgreSQL database using TypeORM, 
// and registers routes for user, sneaker, design, and product functionalities.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const userRoutes_1 = require("./routes/userRoutes");
const sneakerRoutes_1 = require("./routes/sneakerRoutes");
const designRoutes_1 = require("./routes/designRoutes");
const productRoutes_1 = require("./routes/productRoutes");
const airtableRoutes_1 = require("./routes/airtableRoutes");
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({
    logger: true,
});
// Register Swagger
fastify.register(swagger_1.default, {
    openapi: {
        info: {
            title: "Sneaker API",
            version: "1.0.0",
        },
    },
});
fastify.register(swagger_ui_1.default, {
    routePrefix: "/docs",
    staticCSP: true,
    transformSpecification: (swaggerObject, req, reply) => {
        return swaggerObject;
    },
});
// ** Start the Fastify Server, Connect to Database, and Register Routes **
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Initialize the database connection
            yield db_1.AppDataSource.initialize();
            console.log('Database connected successfully.');
            // Fetch Airtable schema to verify access
            // await fetchBaseSchema();
            // Sync Data to Airtable
            // await syncUsersToAirtable();
            // await syncProfilesToAirtable();
            // ** Register routes before the server is ready **
            fastify.register(userRoutes_1.userRoutes);
            fastify.register(sneakerRoutes_1.sneakerRoutes);
            fastify.register(designRoutes_1.designRoutes);
            fastify.register(productRoutes_1.productRoutes);
            fastify.register(airtableRoutes_1.airtableRoutes);
            // ** After all routes are registered, initialize Swagger **
            yield fastify.ready();
            console.log('Swagger documentation available at: http://localhost:3000/documentation');
            // Start the Fastify server
            fastify.listen({ port: 3000, host: 'localhost' }, (err, address) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                console.log(`Server running at ${address}`);
            });
        }
        catch (error) {
            console.error('Startup error:', error);
            process.exit(1);
        }
    });
}
// Call the function to start the server
startServer();
exports.default = fastify;

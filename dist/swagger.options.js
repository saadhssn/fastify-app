"use strict";
// This file defines the Swagger API documentation configuration for the Fastify server. 
// It specifies the API's metadata, such as title, description, version, and host settings.
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    swagger: {
        info: {
            title: "Fastify PostgreSQL API", // The title of the API
            description: "A simple Fastify API integrated with PostgreSQL and TypeORM", // Brief description of the API
            version: "1.0.0", // API version
        },
        host: "localhost:3000", // The host where the API is running
        schemes: ["http"], // The supported protocol for the API (HTTP in this case)
        consumes: ["application/json"], // The type of data the API can consume (in this case, JSON)
        produces: ["application/json"], // The type of data the API can produce (in this case, JSON)
    },
};

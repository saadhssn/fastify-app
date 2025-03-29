// This is the main Fastify server file that initializes and configures the Fastify server,
// integrates Swagger for API documentation, connects to the PostgreSQL database using TypeORM, 
// and registers routes for user, sneaker, design, and product functionalities.

import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { userRoutes } from './routes/userRoutes';
import { sneakerRoutes } from './routes/sneakerRoutes';
import { designRoutes } from './routes/designRoutes';
import { productRoutes } from './routes/productRoutes';
import { airtableRoutes } from './routes/airtableRoutes';
import { shopifyRoutes } from './routes/shopifyRoutes';
import { AppDataSource } from './db';
import dotenv from 'dotenv';
// import { syncUsersToAirtable, syncProfilesToAirtable, fetchBaseSchema } from './services/airtableSync';
import { } from './services/airtableSync';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

// Register Swagger
fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Sneaker API",
      version: "1.0.0",
    },
  },
});

fastify.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  staticCSP: true,
  transformSpecification: (swaggerObject, req, reply) => {
    return swaggerObject;
  },
});

// ** Start the Fastify Server, Connect to Database, and Register Routes **
async function startServer() {
  try {
    // Initialize the database connection
    await AppDataSource.initialize();
    console.log('Database connected successfully.');

    // Fetch Airtable schema to verify access
    // await fetchBaseSchema();

    // Sync Data to Airtable
    // await syncUsersToAirtable();
    // await syncProfilesToAirtable();

    // ** Register routes before the server is ready **
    fastify.register(userRoutes);
    fastify.register(sneakerRoutes);
    fastify.register(designRoutes);
    fastify.register(productRoutes);
    fastify.register(airtableRoutes);
    fastify.register(shopifyRoutes);
    
    // ** After all routes are registered, initialize Swagger **
    await fastify.ready();
    console.log('Swagger documentation available at: http://localhost:3000/documentation');

    // Start the Fastify server
    fastify.listen({ port: 3000, host: 'localhost' }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server running at ${address}`);
    });
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
}

// Call the function to start the server
startServer();

export default fastify;

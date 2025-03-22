import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { userRoutes } from './routes/userRoutes';
import { AppDataSource } from './db';
import path from 'path';

// Initialize Fastify instance
const fastify = Fastify({
  logger: true,
});

// Register Swagger plugin
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'fastify PostgreSQL API',
      description: 'A simple fastify API integrated with PostgreSQL and TypeORM',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  },
});

// Register Swagger UI
fastify.register(fastifySwaggerUI, {
  routePrefix: '/documentation', // Swagger UI route
  uiConfig: {
    docExpansion: 'none',  // Optional: controls the expansion of the docs
    deepLinking: false,    // Optional: enables/disables deep linking
  },
  uiHooks: {
    onRequest: (req, res) => {},
    preHandler: (req, res) => {},
  },
});

async function startServer() {
  try {
    // Register routes
    fastify.register(userRoutes);

    // Initialize DB connection
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');

    // Start the server
    fastify.listen({ port: 3000, host: 'localhost' }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
    
  } catch (error) {
    console.error('Error during startup:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export default fastify;

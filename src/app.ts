import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { userRoutes } from './routes/userRoutes';
import { AppDataSource } from './db';
import dotenv from 'dotenv';
import { syncUsersToAirtable, syncProfilesToAirtable, fetchBaseSchema } from './services/airtableSync';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

// ** Register Swagger for API Documentation **
fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify PostgreSQL API',
      description: 'A Fastify API integrated with PostgreSQL and TypeORM',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
});

fastify.register(fastifySwaggerUI, {
  routePrefix: '/documentation',
  staticCSP: true,
  transformStaticCSP: (header) => header,
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
});

async function startServer() {
  try {

    await AppDataSource.initialize();
    console.log('Database connected successfully.');

    // Fetch Airtable schema to verify access
    await fetchBaseSchema();

    // Sync Data to Airtable
    await syncUsersToAirtable();
    await syncProfilesToAirtable();

    // ** Register routes before ready() **
    fastify.register(userRoutes);

    // ** After all routes are registered, initialize Swagger **
    await fastify.ready();
    console.log('Swagger documentation available at: http://localhost:3000/documentation');

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

startServer();

export default fastify;

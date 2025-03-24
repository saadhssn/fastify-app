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

// Register Swagger
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Fastify PostgreSQL API',
      version: '1.0.0',
    },
  },
});
fastify.register(fastifySwaggerUI, {
  routePrefix: '/documentation',
});

async function startServer() {
  try {
    fastify.register(userRoutes);

    await AppDataSource.initialize();
    console.log('Database connected successfully.');

    // Fetch Airtable schema to verify access
    await fetchBaseSchema();

    // Sync Data to Airtable
    await syncUsersToAirtable();
    await syncProfilesToAirtable();

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

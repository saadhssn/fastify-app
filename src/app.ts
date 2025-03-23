import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { userRoutes } from './routes/userRoutes';
import { AppDataSource } from './db';
import dotenv from 'dotenv';
import Airtable from 'airtable';
import { User } from './entities/User';
import { Profile } from './entities/Profile';

// Load environment variables
dotenv.config();

const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const USERS_TABLE = 'users';
const PROFILES_TABLE = 'profiles';

if (!AIRTABLE_ACCESS_TOKEN || !AIRTABLE_BASE_ID) {
  throw new Error('Missing Airtable credentials. Please set AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID in your .env file.');
}

const base = new Airtable({ apiKey: AIRTABLE_ACCESS_TOKEN }).base(AIRTABLE_BASE_ID);

const syncUsersToAirtable = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  for (const user of users) {
    await base(USERS_TABLE).create([
      {
        fields: {
          id: user.id,
          username: user.username,
          name: user.name,
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          phoneNumber: user.phoneNumber,
          role: user.role,
          location: user.location || '',
          profilePicture: user.profilePicture || '',
          status: user.status,
        },
      },
    ]);
  }

  console.log('Users synced to Airtable');
};

const syncProfilesToAirtable = async () => {
  const profileRepository = AppDataSource.getRepository(Profile);
  const profiles = await profileRepository.find();

  for (const profile of profiles) {
    await base(PROFILES_TABLE).create([
      {
        fields: {
          id: profile.id,
          username: profile.username,
          name: profile.name,
          firstName: profile.firstName,
          lastName: profile.lastName,
          emailAddress: profile.emailAddress,
          phoneNumber: profile.phoneNumber,
          role: profile.role,
          location: profile.location || '',
          profilePicture: profile.profilePicture || '',
          status: profile.status,
        },
      },
    ]);
  }

  console.log('Profiles synced to Airtable');
};

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
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'none',
    deepLinking: false,
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

    // Run Airtable Sync
    await syncUsersToAirtable();
    await syncProfilesToAirtable();
    console.log('Sync completed successfully!');

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

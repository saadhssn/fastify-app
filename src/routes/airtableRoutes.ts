import { FastifyInstance } from 'fastify';
import { syncAirtableToSupabase } from '../services/airtableSync';

export async function airtableRoutes(fastify: FastifyInstance) {
    fastify.get('/sync-airtable', async (request, reply) => {
      console.log("Received request to sync Airtable to Supabase");
      try {
        await syncAirtableToSupabase();
        console.log("Sync process completed successfully");
        reply.send({ message: 'Data synced successfully from Airtable to Supabase' });
      } catch (error) {
        console.error("Error during sync process:", error);
        reply.status(500).send({ success: false, message: 'Internal Server Error' });
      }
    });
  }
  

import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { config } from 'dotenv';

// Load environment variables from the .env file
config();

// Create a new TypeORM DataSource to connect to PostgreSQL
export const AppDataSource = new DataSource({
  type: 'postgres',                   // PostgreSQL database
  host: 'localhost',                  // Database host (localhost)
  port: 5332,                         // Port (matching your Spring Boot config)
  username: process.env.DB_USERNAME,  // Username (use environment variable for flexibility)
  password: process.env.DB_PASSWORD,  // Password (use environment variable for flexibility)
  database: process.env.DB_NAME,      // Database name (use environment variable for flexibility)
  synchronize: true,                  // Automatically sync entities (like ddl-auto: update)
  logging: true,                      // Enable SQL query logging (similar to show-sql)
  entities: [User],                   // Add your entities here
  migrations: [],                     // Optionally add migrations if needed
  subscribers: [],                    // Optionally add subscribers if needed
  // Define additional options if needed based on your project setup
});

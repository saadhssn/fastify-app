// This file handles the initialization of the PostgreSQL database connection using TypeORM. 
// It loads environment variables using dotenv, configures the DataSource for PostgreSQL, 
// and sets up entities (User, Role, and Profile). It also includes the database connection logic.

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Role } from "./entities/Role";
import { Profile } from "./entities/Profile";
// import { Product } from "./entities/Product";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Role, Profile],
});

AppDataSource.initialize()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));


//Corrected db file 

// // This file handles the initialization of the PostgreSQL database connection using TypeORM. 
// // It loads environment variables using dotenv, configures the DataSource for PostgreSQL, 
// // and sets up entities (User, Role, and Profile). It also includes the database connection logic.

// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { User } from "./entities/User";
// import { Role } from "./entities/Role";
// import { config } from "dotenv";
// import { Profile } from "./entities/Profile";

// // Load environment variables from .env file
// config();

// // Initialize the DataSource for PostgreSQL
// export const AppDataSource = new DataSource({
//   type: "postgres", // Type of database (PostgreSQL)
//   host: process.env.DB_HOST || "localhost", // Database host (default to 'localhost')
//   port: Number(process.env.DB_PORT) || 5432, // Database port (default to 5432)
//   username: process.env.DB_USERNAME, // Database username
//   password: process.env.DB_PASSWORD, // Database password
//   database: process.env.DB_NAME, // Database name
//   synchronize: true, // Auto-sync the database schema (dangerous in production)
//   logging: true, // Enable SQL query logging (helpful for debugging)
//   entities: [User, Role, Profile], // Define entities to be used with the database
// });

// // Initialize the database connection
// AppDataSource.initialize()
//   .then(() => console.log("Database connected successfully")) // Success message
//   .catch((error) => console.error("Database connection error:", error)); // Error handling

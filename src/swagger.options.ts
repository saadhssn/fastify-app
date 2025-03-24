export const options = {
  swagger: {
    info: {
      title: "Fastify PostgreSQL API",
      description: "A simple Fastify API integrated with PostgreSQL and TypeORM",
      version: "1.0.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};

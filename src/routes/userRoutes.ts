import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/users/admin-sign-up", userController.signUpAdmin);
  fastify.post("/users/user-sign-up", userController.signUpUser);
};

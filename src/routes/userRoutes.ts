import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController";

export const userRoutes = async (fastify: FastifyInstance) => {
  /**
   * @swagger
   * /users/admin-sign-up:
   *   post:
   *     summary: Register a new admin user
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               name:
   *                 type: string
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *               phoneNumber:
   *                 type: string
   *               password:
   *                 type: string
   *               location:
   *                 type: string
   *               profilePicture:
   *                 type: string
   *     responses:
   *       201:
   *         description: Admin registered successfully
   *       400:
   *         description: Bad request
   */
  fastify.post("/users/admin-sign-up", userController.signUpAdmin);

  /**
   * @swagger
   * /users/user-sign-up:
   *   post:
   *     summary: Register a new user
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               name:
   *                 type: string
   *               firstName:
   *                 type: string
   *               lastName:
   *                 type: string
   *               email:
   *                 type: string
   *               phoneNumber:
   *                 type: string
   *               password:
   *                 type: string
   *               location:
   *                 type: string
   *               profilePicture:
   *                 type: string
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Bad request
   */
  fastify.post("/users/user-sign-up", userController.signUpUser);

  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: User login
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login successful
   *       401:
   *         description: Unauthorized
   */
  fastify.post("/users/login", userController.login);
};

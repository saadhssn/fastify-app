"use strict";
// User routes for handling user sign-ups (admin and regular), and login functionality with Swagger documentation.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const userController_1 = require("../controllers/userController");
const userRoutes = (fastify) => __awaiter(void 0, void 0, void 0, function* () {
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
    fastify.post("/users/admin-sign-up", userController_1.userController.signUpAdmin);
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
    fastify.post("/users/user-sign-up", userController_1.userController.signUpUser);
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
    fastify.post("/users/login", userController_1.userController.login);
});
exports.userRoutes = userRoutes;

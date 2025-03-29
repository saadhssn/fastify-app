"use strict";
// User controller handling sign up for both admin and user (advertiser) accounts, as well as user login functionality.
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
exports.userController = void 0;
const userService_1 = require("../services/userService");
const userService = new userService_1.UserService();
exports.userController = {
    // Signup function for creating an admin account
    signUpAdmin(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, name, firstName, lastName, email, phoneNumber, password, location, profilePicture, } = req.body;
                // Calls the UserService to sign up an admin with the provided data
                const newUser = yield userService.signUpUser(username, firstName, lastName, email, phoneNumber, password, "admin", location, profilePicture);
                // Sends success response after successful user creation
                reply.status(201).send({ message: "Admin account created", user: newUser });
            }
            catch (error) {
                // Handles any error that occurs and sends an error message
                reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
            }
        });
    },
    // Signup function for creating a user (advertiser) account
    signUpUser(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, firstName, lastName, email, phoneNumber, password, location, profilePicture, } = req.body;
                // Calls the UserService to sign up a user with the provided data
                const newUser = yield userService.signUpUser(username, firstName, lastName, email, phoneNumber, password, "user", // user role is set to user
                location, profilePicture);
                // Sends success response after successful user creation
                reply.status(201).send({ message: "Advertiser account created", user: newUser });
            }
            catch (error) {
                // Handles any error that occurs and sends an error message
                reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
            }
        });
    },
    // Login function for user authentication
    login(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                // Calls the UserService to authenticate the user
                const response = yield userService.loginUser(username, password);
                // Sends response with the authentication result
                reply.status(200).send(response);
            }
            catch (error) {
                // Handles any error that occurs and sends an error message
                reply.status(400).send({ error: error instanceof Error ? error.message : "An error occurred" });
            }
        });
    },
};

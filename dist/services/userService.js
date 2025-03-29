"use strict";
// UserService class containing methods for user sign-up and login functionality.
// The signUpUser function registers a new user and creates a profile for them.
// The loginUser function handles the user authentication and JWT token generation.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../entities/User");
const Profile_1 = require("../entities/Profile");
class UserService {
    constructor() {
        this.userRepository = db_1.AppDataSource.getRepository(User_1.User);
        this.profileRepository = db_1.AppDataSource.getRepository(Profile_1.Profile);
    }
    /**
     * Sign up function to create a new user and a profile.
     * It hashes the password and stores user data in both User and Profile entities.
     * @param username - The unique username for the user.
     * @param firstName - The first name of the user.
     * @param lastName - The last name of the user.
     * @param email - The unique email address for the user.
     * @param phoneNumber - The unique phone number of the user.
     * @param password - The password of the user to be hashed.
     * @param role - The role assigned to the user (e.g., 'admin', 'user').
     * @param location - (Optional) The location of the user.
     * @param profilePicture - (Optional) The URL of the user's profile picture.
     * @returns A success message and the created user and profile.
     */
    signUpUser(username, firstName, lastName, email, phoneNumber, password, role, location, profilePicture) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                // Check if user already exists
                const existingUser = yield transactionalEntityManager.findOne(User_1.User, { where: { emailAddress: email } });
                if (existingUser) {
                    throw new Error("User already exists");
                }
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const name = `${firstName} ${lastName}`;
                // Create and save User
                const newUser = transactionalEntityManager.create(User_1.User, {
                    username,
                    name,
                    firstName,
                    lastName,
                    emailAddress: email,
                    phoneNumber,
                    password: hashedPassword,
                    role: role.toLowerCase(),
                    location: location || null,
                    profilePicture: profilePicture || null,
                });
                yield transactionalEntityManager.save(User_1.User, newUser);
                // Create and save Profile (using same ID as User)
                const newProfile = transactionalEntityManager.create(Profile_1.Profile, {
                    id: newUser.id, // Ensuring profile ID matches user ID
                    username,
                    name,
                    firstName,
                    lastName,
                    emailAddress: email,
                    phoneNumber,
                    role: role.toLowerCase(),
                    location: location || null,
                    profilePicture: profilePicture || null,
                });
                yield transactionalEntityManager.save(Profile_1.Profile, newProfile);
                return {
                    message: "User and Profile created successfully",
                    user: newUser,
                    profile: newProfile,
                };
            }));
        });
    }
    /**
     * Login function to authenticate the user and generate a JWT token.
     * @param username - The username of the user attempting to log in.
     * @param password - The password entered by the user.
     * @returns A success message with the generated JWT token and user details.
     */
    loginUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { username } });
            if (!user) {
                throw new Error("Invalid credentials!");
            }
            if (!user.status) {
                throw new Error("Account is inactive!");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid credentials!");
            }
            const token = jsonwebtoken_1.default.sign({ role: user.role, userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
            return {
                message: "Authentication successful!",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    emailAddress: user.emailAddress,
                    phoneNumber: user.phoneNumber,
                    location: user.location,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.profilePicture,
                    status: user.status,
                },
            };
        });
    }
}
exports.UserService = UserService;

"use strict";
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
exports.sneakerController = void 0;
const sneakerService_1 = require("../services/sneakerService");
const sneakerService = new sneakerService_1.SneakerService();
exports.sneakerController = {
    addSneaker(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSneaker = yield sneakerService.createSneaker(req.body);
                reply.status(201).send({ message: "Sneaker added successfully", sneaker: newSneaker });
            }
            catch (error) {
                reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
            }
        });
    },
    getAllSneakers(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sneakers = yield sneakerService.getAllSneakers();
                reply.status(200).send({ sneakers });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to fetch sneakers" });
            }
        });
    },
    getSneakerById(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sneaker = yield sneakerService.getSneakerById(Number(req.params.id));
                if (!sneaker)
                    return reply.status(404).send({ error: "Sneaker not found" });
                reply.status(200).send({ sneaker });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to fetch sneaker" });
            }
        });
    },
    updateSneaker(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedSneaker = yield sneakerService.updateSneaker(Number(req.params.id), req.body);
                if (!updatedSneaker)
                    return reply.status(404).send({ error: "Sneaker not found" });
                reply.status(200).send({ message: "Sneaker updated successfully", sneaker: updatedSneaker });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to update sneaker" });
            }
        });
    },
    deleteSneaker(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sneakerService.deleteSneaker(Number(req.params.id));
                reply.status(200).send(result);
            }
            catch (error) {
                reply.status(404).send({ error: error instanceof Error ? error.message : "Failed to delete sneaker" });
            }
        });
    },
};

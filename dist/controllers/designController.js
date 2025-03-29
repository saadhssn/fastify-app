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
exports.designController = void 0;
const designService_1 = require("../services/designService");
const designService = new designService_1.DesignService();
exports.designController = {
    addDesign(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDesign = yield designService.createDesign(req.body);
                reply.status(201).send({ message: "Design added successfully", design: newDesign });
            }
            catch (error) {
                reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
            }
        });
    },
    getAllDesigns(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const designs = yield designService.getAllDesigns();
                reply.status(200).send({ designs });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to fetch designs" });
            }
        });
    },
    getDesignById(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const design = yield designService.getDesignById(Number(req.params.id));
                if (!design)
                    return reply.status(404).send({ error: "Design not found" });
                reply.status(200).send({ design });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to fetch design" });
            }
        });
    },
    updateDesign(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedDesign = yield designService.updateDesign(Number(req.params.id), req.body);
                if (!updatedDesign)
                    return reply.status(404).send({ error: "Design not found" });
                reply.status(200).send({ message: "Design updated successfully", design: updatedDesign });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to update design" });
            }
        });
    },
    deleteDesign(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield designService.deleteDesign(Number(req.params.id));
                reply.status(200).send(result);
            }
            catch (error) {
                reply.status(404).send({ error: error instanceof Error ? error.message : "Failed to delete design" });
            }
        });
    },
};

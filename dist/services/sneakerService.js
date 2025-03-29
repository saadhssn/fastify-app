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
exports.SneakerService = void 0;
const db_1 = require("../db");
const Sneakers_1 = require("../entities/Sneakers");
class SneakerService {
    constructor() {
        this.sneakerRepository = db_1.AppDataSource.getRepository(Sneakers_1.Sneakers);
    }
    createSneaker(sneakerData) {
        return __awaiter(this, void 0, void 0, function* () {
            const sneaker = this.sneakerRepository.create(sneakerData);
            return yield this.sneakerRepository.save(sneaker);
        });
    }
    getAllSneakers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sneakerRepository.find();
        });
    }
    getSneakerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sneakerRepository.findOne({ where: { id } });
        });
    }
    updateSneaker(id, sneakerData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sneakerRepository.update(id, sneakerData);
            return yield this.getSneakerById(id);
        });
    }
    deleteSneaker(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.sneakerRepository.delete(id);
            if (result.affected === 0)
                throw new Error("Sneaker not found");
            return { message: "Sneaker deleted successfully" };
        });
    }
}
exports.SneakerService = SneakerService;

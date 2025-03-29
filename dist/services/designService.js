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
exports.DesignService = void 0;
const db_1 = require("../db");
const Designs_1 = require("../entities/Designs");
class DesignService {
    constructor() {
        this.designRepository = db_1.AppDataSource.getRepository(Designs_1.Designs);
    }
    createDesign(designData) {
        return __awaiter(this, void 0, void 0, function* () {
            const design = this.designRepository.create(designData);
            return yield this.designRepository.save(design);
        });
    }
    getAllDesigns() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.designRepository.find();
        });
    }
    getDesignById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.designRepository.findOne({ where: { id } });
        });
    }
    updateDesign(id, designData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.designRepository.update(id, designData);
            return yield this.getDesignById(id);
        });
    }
    deleteDesign(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.designRepository.delete(id);
            if (result.affected === 0)
                throw new Error("Design not found");
            return { message: "Design deleted successfully" };
        });
    }
}
exports.DesignService = DesignService;

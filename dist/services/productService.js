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
exports.ProductService = void 0;
const db_1 = require("../db");
const Products_1 = require("../entities/Products");
class ProductService {
    constructor() {
        this.productRepository = db_1.AppDataSource.getRepository(Products_1.Products);
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = this.productRepository.create(productData);
            return yield this.productRepository.save(product);
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.find();
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.findOne({ where: { id } });
        });
    }
    updateProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productRepository.update(id, productData);
            return yield this.getProductById(id);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productRepository.delete(id);
            if (result.affected === 0)
                throw new Error("Product not found");
            return { message: "Product deleted successfully" };
        });
    }
}
exports.ProductService = ProductService;

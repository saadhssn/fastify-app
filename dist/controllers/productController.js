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
exports.productController = void 0;
const productService_1 = require("../services/productService");
const productService = new productService_1.ProductService();
exports.productController = {
    addProduct(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield productService.createProduct(req.body);
                reply.status(201).send({ message: "Product added successfully", product: newProduct });
            }
            catch (error) {
                reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
            }
        });
    },
    getAllProducts(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getAllProducts();
                reply.status(200).send({ products });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to fetch products" });
            }
        });
    },
    getProductById(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productService.getProductById(Number(req.params.id));
                if (!product)
                    return reply.status(404).send({ error: "Product not found" });
                reply.status(200).send({ product });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to fetch product" });
            }
        });
    },
    updateProduct(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield productService.updateProduct(Number(req.params.id), req.body);
                if (!updatedProduct)
                    return reply.status(404).send({ error: "Product not found" });
                reply.status(200).send({ message: "Product updated successfully", product: updatedProduct });
            }
            catch (error) {
                reply.status(500).send({ error: "Failed to update product" });
            }
        });
    },
    deleteProduct(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield productService.deleteProduct(Number(req.params.id));
                reply.status(200).send(result);
            }
            catch (error) {
                reply.status(404).send({ error: error instanceof Error ? error.message : "Failed to delete product" });
            }
        });
    },
};

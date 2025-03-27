import { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../services/productService";
import { Products } from "../entities/Products"; // Fix import

const productService = new ProductService();

export const productController = {
  async addProduct(req: FastifyRequest<{ Body: Partial<Products> }>, reply: FastifyReply) {
    try {
      const newProduct = await productService.createProduct(req.body as Partial<Products>);
      reply.status(201).send({ message: "Product added successfully", product: newProduct });
    } catch (error) {
      reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  },

  async getAllProducts(req: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await productService.getAllProducts();
      reply.status(200).send({ products });
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch products" });
    }
  },

  async getProductById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const product = await productService.getProductById(Number(req.params.id));
      if (!product) return reply.status(404).send({ error: "Product not found" });
      reply.status(200).send({ product });
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch product" });
    }
  },

  async updateProduct(req: FastifyRequest<{ Params: { id: string }; Body: Partial<Products> }>, reply: FastifyReply) {
    try {
      const updatedProduct = await productService.updateProduct(Number(req.params.id), req.body as Partial<Products>);
      if (!updatedProduct) return reply.status(404).send({ error: "Product not found" });
      reply.status(200).send({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      reply.status(500).send({ error: "Failed to update product" });
    }
  },

  async deleteProduct(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const result = await productService.deleteProduct(Number(req.params.id));
      reply.status(200).send(result);
    } catch (error) {
      reply.status(404).send({ error: error instanceof Error ? error.message : "Failed to delete product" });
    }
  },
};

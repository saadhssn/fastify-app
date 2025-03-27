import { AppDataSource } from "../db";
import { Products } from "../entities/Products";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Products);

  async createProduct(productData: Partial<Products>) {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async getAllProducts() {
    return await this.productRepository.find();
  }

  async getProductById(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async updateProduct(id: number, productData: Partial<Products>) {
    await this.productRepository.update(id, productData);
    return await this.getProductById(id);
  }

  async deleteProduct(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) throw new Error("Product not found");
    return { message: "Product deleted successfully" };
  }
}

import { AppDataSource } from "../db";
import { Designs } from "../entities/Designs";

export class DesignService {
  private designRepository = AppDataSource.getRepository(Designs);

  async createDesign(designData: Partial<Designs>) {
    const design = this.designRepository.create(designData);
    return await this.designRepository.save(design);
  }

  async getAllDesigns() {
    return await this.designRepository.find();
  }

  async getDesignById(id: number) {
    return await this.designRepository.findOne({ where: { id } });
  }

  async updateDesign(id: number, designData: Partial<Designs>) {
    await this.designRepository.update(id, designData);
    return await this.getDesignById(id);
  }

  async deleteDesign(id: number) {
    const result = await this.designRepository.delete(id);
    if (result.affected === 0) throw new Error("Design not found");
    return { message: "Design deleted successfully" };
  }
}

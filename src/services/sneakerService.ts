import { AppDataSource } from "../db";
import { Sneakers } from "../entities/Sneakers";

export class SneakerService {
  private sneakerRepository = AppDataSource.getRepository(Sneakers);

  async createSneaker(sneakerData: Partial<Sneakers>) {
    const sneaker = this.sneakerRepository.create(sneakerData);
    return await this.sneakerRepository.save(sneaker);
  }

  async getAllSneakers() {
    return await this.sneakerRepository.find();
  }

  async getSneakerById(id: number) {
    return await this.sneakerRepository.findOne({ where: { id } });
  }

  async updateSneaker(id: number, sneakerData: Partial<Sneakers>) {
    await this.sneakerRepository.update(id, sneakerData);
    return await this.getSneakerById(id);
  }

  async deleteSneaker(id: number) {
    const result = await this.sneakerRepository.delete(id);
    if (result.affected === 0) throw new Error("Sneaker not found");
    return { message: "Sneaker deleted successfully" };
  }
}

import { FastifyReply, FastifyRequest } from "fastify";
import { SneakerService } from "../services/sneakerService";
import { Sneakers } from "../entities/Sneakers"; // Fix import

const sneakerService = new SneakerService();

export const sneakerController = {
  async addSneaker(req: FastifyRequest<{ Body: Partial<Sneakers> }>, reply: FastifyReply) {
    try {
      const newSneaker = await sneakerService.createSneaker(req.body as Partial<Sneakers>);
      reply.status(201).send({ message: "Sneaker added successfully", sneaker: newSneaker });
    } catch (error) {
      reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  },

  async getAllSneakers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const sneakers = await sneakerService.getAllSneakers();
      reply.status(200).send({ sneakers });
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch sneakers" });
    }
  },

  async getSneakerById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const sneaker = await sneakerService.getSneakerById(Number(req.params.id));
      if (!sneaker) return reply.status(404).send({ error: "Sneaker not found" });
      reply.status(200).send({ sneaker });
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch sneaker" });
    }
  },

  async updateSneaker(req: FastifyRequest<{ Params: { id: string }; Body: Partial<Sneakers> }>, reply: FastifyReply) {
    try {
      const updatedSneaker = await sneakerService.updateSneaker(Number(req.params.id), req.body as Partial<Sneakers>);
      if (!updatedSneaker) return reply.status(404).send({ error: "Sneaker not found" });
      reply.status(200).send({ message: "Sneaker updated successfully", sneaker: updatedSneaker });
    } catch (error) {
      reply.status(500).send({ error: "Failed to update sneaker" });
    }
  },

  async deleteSneaker(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const result = await sneakerService.deleteSneaker(Number(req.params.id));
      reply.status(200).send(result);
    } catch (error) {
      reply.status(404).send({ error: error instanceof Error ? error.message : "Failed to delete sneaker" });
    }
  },
};

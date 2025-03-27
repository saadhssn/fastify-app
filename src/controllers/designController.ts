import { FastifyReply, FastifyRequest } from "fastify";
import { DesignService } from "../services/designService";
import { Designs } from "../entities/Designs"; // Fix import

const designService = new DesignService();

export const sneakerController = {
  async addDesign(req: FastifyRequest<{ Body: Partial<Designs> }>, reply: FastifyReply) {
    try {
      const newDesign = await designService.createDesign(req.body as Partial<Designs>);
      reply.status(201).send({ message: "Design added successfully", sneaker: newDesign });
    } catch (error) {
      reply.status(400).send({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  },

  async getAllDesigns(req: FastifyRequest, reply: FastifyReply) {
    try {
      const designs = await designService.getAllDesigns();
      reply.status(200).send({ designs });
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch designs" });
    }
  },

  async getDesignById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const design = await designService.getDesignById(Number(req.params.id));
      if (!design) return reply.status(404).send({ error: "Design not found" });
      reply.status(200).send({ design });
    } catch (error) {
      reply.status(500).send({ error: "Failed to fetch design" });
    }
  },

  async updateDesign(req: FastifyRequest<{ Params: { id: string }; Body: Partial<Designs> }>, reply: FastifyReply) {
    try {
      const updatedDesign = await designService.updateDesign(Number(req.params.id), req.body as Partial<Designs>);
      if (!updatedDesign) return reply.status(404).send({ error: "Design not found" });
      reply.status(200).send({ message: "Design updated successfully", design: updatedDesign });
    } catch (error) {
      reply.status(500).send({ error: "Failed to update design" });
    }
  },

  async deleteDesign(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const result = await designService.deleteDesign(Number(req.params.id));
      reply.status(200).send(result);
    } catch (error) {
      reply.status(404).send({ error: error instanceof Error ? error.message : "Failed to delete design" });
    }
  },
};

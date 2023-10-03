import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getAllListaCadastrados(app: FastifyInstance) {
  app.get("/cadastro", async () => {
    const cadastro = await prisma.cadastro.findMany();
    return cadastro;
  });
}
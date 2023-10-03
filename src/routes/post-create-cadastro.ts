import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function postCadastro(app: FastifyInstance) {
  app.post("/create", async (req) => {
    const bodySchema = z.object({
      name: z.string(),
      senha: z.coerce.string(),
      email: z.string(),
    });
    try {
      const { name, senha, email } = bodySchema.parse(req.body);

      const novoCadastro = await prisma.cadastro.create({
        data: { email, name, senha },
      });

      return novoCadastro;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar cadastro");
    }
  });
}
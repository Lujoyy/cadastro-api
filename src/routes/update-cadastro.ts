import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function updateCadastro(app: FastifyInstance) {
  app.put(
    "/cadastro/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        id: z.coerce.string(),
      });
      const bodySchema = z.object({
        name: z.string(),
        senha: z.coerce.string(),
        email: z.string(),
        contact: z.number().optional(),
      });

      const { id } = paramsSchema.parse(request.params);
      const { name, senha, email, contact } = bodySchema.parse(request.body);
      try {
        const cadastroAtualizado = await prisma.cadastro.update({
          where: { id },
          data: { name, senha, email, contact },
        });
        reply.send(cadastroAtualizado);
      } catch (error) {
        reply.code(500).send({ error: "Erro ao atualizar cadastro" });
      }
    }
  );
}
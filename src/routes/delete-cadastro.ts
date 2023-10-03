import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function deleteCadastro(app: FastifyInstance) {
  app.delete("/cadastroDelete/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);

    try {
      const deletedCadastro = await prisma.cadastro.delete({
        where: {
          id: id,
        },
      });

      if (!deletedCadastro) {
        reply.code(404).send({ error: "Cadastro não encontrado" });
      } else {
        reply.code(204).send();
      }
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: "Erro ao excluir cadastro" });
    }
  });
}

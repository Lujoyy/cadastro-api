import { fastify } from "fastify";
import { getAllListaCadastrados } from "./routes/get-all-cadastro";
import { postCadastro } from "./routes/post-create-cadastro";
import { deleteCadastro } from "./routes/delete-cadastro";
import { updateCadastro } from "./routes/update-cadastro";

const app = fastify();

//listar
app.register(getAllListaCadastrados);

//criar
app.register(postCadastro);

//deletar
app.register(deleteCadastro);

//update
app.register(updateCadastro);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Servidor HTTP está em execução!!!!");
  })
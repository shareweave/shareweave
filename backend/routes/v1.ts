import { uploadToArweave } from "../services";

import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";

export async function v1(app: FastifyInstance, _opts: FastifyPluginOptions) {
  app.post("/", saveData);

  app.get("/", async (_req, _res) => "Hello World!");
}

type CustomRequest = FastifyRequest<{
  Body: string;
}>;

async function saveData({ body }: CustomRequest, _reply: FastifyReply) {
  const transaction = await uploadToArweave(body);
  return transaction;
}

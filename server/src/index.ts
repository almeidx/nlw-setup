import cors from "@fastify/cors";
import { fastify } from "fastify";
import { appRoutes } from "./routes.js";

const PORT = 3_333;

const app = fastify();

await app.register(cors);
await app.register(appRoutes);

await app.listen({ port: PORT });

console.info("Server started on port %d", PORT);

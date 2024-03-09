import { fastifyCors } from "@fastify/cors";
import { fastifyHelmet } from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import { fastifyRequestContext } from "@fastify/request-context";
import fastifySwagger from "@fastify/swagger";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";

const app = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const configurePlugins = async () => {
  app.register(fastifyCors);
  app.register(fastifyHelmet);
  app.register(fastifyRequestContext, {
    defaultStoreValues: (req) => ({
      correlationId: req.headers?.correlationId,
    }),
  });

  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Transnode",
        description: "Example of HTTP API built for an fake carrier",
        version: "1",
      },
    },
  });

  app.register(fastifyRateLimit, {
    max: 500,
    timeWindow: "1 minute",
  });
};

export const setup = async () => {
  await configurePlugins();
};

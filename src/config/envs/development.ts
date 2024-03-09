import Env from "env-var";
import { defineConfig } from "../defineConfig";

export function createDevelopmentConfig() {
  return defineConfig({
    env: "development",
    server: {
      port: Env.get("PORT").required().asPortNumber(),
    },
    database: {
      port: Env.get("DB_PORT").required().asPortNumber(),
      host: Env.get("DB_HOST").required().asString(),
      user: Env.get("DB_USER").required().asString(),
      password: Env.get("DB_PASSWORD").required().asString(),
      database: Env.get("DB_DATABASE").required().asString(),
      ssl: false,
    },
  });
}

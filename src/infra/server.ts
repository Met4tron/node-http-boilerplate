import { appConfig } from "~config";
import { setup } from "~infra/app";

async function bootstrap() {
  const app = await setup();

  try {
    await app.listen({
      port: appConfig.server.port,
    });
  } catch (e) {
    app.log.error(e);
  }
}

bootstrap();

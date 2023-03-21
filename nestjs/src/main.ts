import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GqlAuthAccessGuard } from "./auth/guards/gql-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.enableCors({
    origin: process.env.ORIGIN,
    credentials: true,
  });
  app.useGlobalGuards(new GqlAuthAccessGuard(reflector));
  await app.listen(3000);
}
bootstrap();

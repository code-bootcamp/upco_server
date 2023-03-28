import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GqlAuthAccessGuard } from "./auth/guards/gql-auth.guard";
import { graphqlUploadExpress } from "graphql-upload";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.enableCors({
    // origin: process.env.ORIGIN,
    origin: "*",
    credentials: true,
  });
  app.useGlobalGuards(new GqlAuthAccessGuard(reflector));
  app.use(graphqlUploadExpress({}));
  await app.listen(3000);
}
bootstrap();

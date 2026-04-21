import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Job Board API')
    .setDescription(
      'REST API for the Job Board platform. GraphQL API is available at /graphql (Apollo Sandbox in development).',
    )
    .setVersion('1.0')
    .addTag('health', 'Health check')
    .addTag('locations', 'Location management')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
}
void bootstrap();

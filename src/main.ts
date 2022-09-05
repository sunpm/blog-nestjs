import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const port = 7777;
const apiPath = 'docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置全局api前缀
  app.setGlobalPrefix('api');

  // 允许跨域
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('sunpm博客后端接口文档')
    .setDescription('没有描述')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(apiPath, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(port);

  console.log(`http://localhost:${port}/${apiPath}`);
}
bootstrap();

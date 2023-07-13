import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix('api/')

  app.useStaticAssets(join(__dirname, '../upload'), { prefix: '/public' })
  // app.useStaticAssets({ root: join(__dirname, '../path') })

  const config = new DocumentBuilder()
    .setTitle('K10-app')
    .setDescription('The k10 API description')
    .setVersion('1.0')
    .addTag('k10-app')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT || 9001, '0.0.0.0', () => {
    console.log('Port listen ' + process.env.PORT || 9001)
  })
}
bootstrap()

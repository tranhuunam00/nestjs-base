import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors({
    origin: ['*'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix('api/')

  app.useStaticAssets(join(__dirname, '../../upload'), { prefix: '/public' })
  // app.useStaticAssets({ root: join(__dirname, '../path') })

  await app.listen(process.env.PORT || 9001, '0.0.0.0', () => {
    console.log('Port listen ' + process.env.PORT || 9001)
  })
}
bootstrap()

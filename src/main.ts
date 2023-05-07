import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'

import helmet from '@fastify/helmet'
import { contentParser } from 'fastify-multer'
import { join } from 'path'

declare const module: any

const CORS_OPTIONS = {
  origin: '*', // or '*' or whatever is required
  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  exposedHeaders: 'Authorization',
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
}

const adapter = new FastifyAdapter()
adapter.enableCors(CORS_OPTIONS)

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    {
      bodyParser: true,
    }
  )

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.setGlobalPrefix('api/')

  app.useStaticAssets({ root: join(__dirname, '../../fastify-file-upload') })
  app.register(contentParser)

  await app.register(helmet)
  await app.listen(process.env.PORT || 3000)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()

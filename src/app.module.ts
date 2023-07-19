import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { ResponseConfigInterceptor } from './core/interceptor/tranform.interceptor'
import { AuthMiddleware } from './core/middleware/CheckToken.middleware'
import { UsersModule } from './modules/users/users.module'
import { GlobalModule } from './global/global.module'
import { RolesGuard } from './core/guards/Role.guard'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { SensorModule } from './modules/sensor/sensor.module'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 99999999999,
      },
    }),
    AuthModule,
    UsersModule,
    GlobalModule,
    SensorModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './path',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseConfigInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthMiddleware,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)

      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/sign-in', method: RequestMethod.POST },
        { path: 'auth/verify', method: RequestMethod.GET },
        { path: 'up-load', method: RequestMethod.POST },
        { path: 'sensor/accelorometer-csv', method: RequestMethod.GET },
        { path: 'sensor', method: RequestMethod.POST },
        { path: 'sensor', method: RequestMethod.DELETE },
        { path: '/up-load', method: RequestMethod.ALL },
        { path: '/upload-paper', method: RequestMethod.ALL },
        { path: '/chat', method: RequestMethod.ALL }
      )
      .forRoutes('*')
  }
}

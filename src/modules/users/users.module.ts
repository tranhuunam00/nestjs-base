import { Module } from '@nestjs/common'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserRepositories } from './user.repositories'
import { MongooseModule } from '@nestjs/mongoose'
import { CONFIG_APP, USER_MODEL } from 'src/core/constants'
import { User, UserSchema } from 'src/models/user.model'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UsersService, UserRepositories],
  exports: [UsersService, UserRepositories],
  controllers: [UsersController],
})
export class UsersModule {}

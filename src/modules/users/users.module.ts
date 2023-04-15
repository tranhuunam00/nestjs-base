import { Module } from '@nestjs/common'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { UserRepositories } from './user.repositories'
import { MongooseModule } from '@nestjs/mongoose'
import { USER_MODEL } from 'src/core/constants'
import { User, UserSchema } from 'src/models/user.model'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, UserRepositories],
  exports: [UsersService, UserRepositories],
  controllers: [UsersController],
})
export class UsersModule {}

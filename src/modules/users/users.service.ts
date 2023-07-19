import { BadGatewayException, Injectable } from '@nestjs/common'

import { UserRepositories } from './user.repositories'
import { SignInDto } from '../auth/dto/auth.dto'
import { BaseUserDto } from './dto/user.dto'
import { AUTH_ERROR } from 'src/core/constants/errorMessage'
import { hashPassword } from 'src/lib/bcrypt.lib'
import mongoose, { ObjectId } from 'mongoose'

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepositories) {}
  createUser = async (data: SignInDto) => {
    return await this.userRepo.create(data)
  }

  updateProfile = async (id: string, data: BaseUserDto) => {
    const existedUser = await this.userRepo.findOneById(id)
    if (!existedUser) throw new BadGatewayException(AUTH_ERROR.USER_NOT_EXISTED)
    let hash = existedUser.password
    if (data.password) {
      hash = await hashPassword(data.password)
    }
    const saveData = { ...data, password: hash }

    const newUser = await this.userRepo.updateOne(
      { _id: existedUser._id },
      saveData
    )
    return newUser
  }
}

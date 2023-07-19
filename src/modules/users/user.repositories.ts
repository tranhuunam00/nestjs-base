import { Injectable, Inject } from '@nestjs/common'

import { USER_MODEL, USER_REPOSITORY } from '../../core/constants'

import { Model } from 'mongoose'
import { SignInDto } from '../auth/dto/auth.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from 'src/models/user.model'

@Injectable()
export class UserRepositories {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByCondition(query: Partial<User>): Promise<User> {
    return await this.userModel.findOne({ ...query })
  }

  async findByEmail(query: Partial<User>): Promise<User> {
    return await this.userModel.findOne({ ...query })
  }

  async findOneById(id: string) {
    return await this.userModel.findById(id)
  }

  async create(data: Partial<User>): Promise<User> {
    const created = new this.userModel(data)
    const result = await created.save({})
    return result
  }
  async deleteOne(where: Partial<User>) {
    await this.userModel.deleteOne({ where })
  }

  async delete(where: Partial<User>) {
    await this.userModel.deleteMany({ ...where })
  }

  async updateOne(where: Partial<User>, data: Partial<User>) {
    console.log(where, data)
    return await this.userModel.updateOne({ ...where }, { ...data })
  }
}

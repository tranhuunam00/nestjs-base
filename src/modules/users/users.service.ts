import { Injectable } from '@nestjs/common'

import { UserRepositories } from './user.repositories'
import { SignInDto } from '../auth/dto/auth.dto'

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepositories) {}
  createUser = async (data: SignInDto) => {
    return await this.userRepo.create(data)
  }
}

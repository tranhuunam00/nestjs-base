import { Injectable } from '@nestjs/common'

import { UserRepositories } from './user.repositories'

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepositories) {}
}

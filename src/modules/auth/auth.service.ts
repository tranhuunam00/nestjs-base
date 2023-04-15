import { LoginDto, SignInDto } from './dto/auth.dto'

import { JwtService } from '@nestjs/jwt'

import { UserRepositories } from '../users/user.repositories'
import { BadGatewayException, Injectable } from '@nestjs/common'
import { AUTH_ERROR } from 'src/core/constants/errorMessage'
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepositories,
    private jwtService: JwtService
  ) {}

  public async login(data: LoginDto) {}

  public async signIn(data: SignInDto) {
    const existedUser = await this.userRepo.findOneByCondition({
      email: data.email,
    })
    if (existedUser)
      throw new BadGatewayException(AUTH_ERROR.USER_ALREADY_EXISTED)

    const newUser = await this.userRepo.create(data)

    return newUser
  }
}

import { LoginDto, SignInDto } from './dto/auth.dto'

import { JwtService } from '@nestjs/jwt'

import { UserRepositories } from '../users/user.repositories'
import { BadGatewayException, Injectable } from '@nestjs/common'
import { AUTH_ERROR } from 'src/core/constants/errorMessage'
import { NodeMailerLib } from 'src/lib/nodemailer.lib'
import { Status_User } from 'src/models/user.model'
import { JWT_SECRET } from 'src/core/constants'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepositories,
    private jwtService: JwtService
  ) {}

  public async login(data: LoginDto) {
    const existedUser = await this.userRepo.findOneByCondition({
      username: data.username,
      status: Status_User.active,
    })
    if (!existedUser) {
      throw new BadGatewayException(AUTH_ERROR.USER_NOT_EXISTED)
    }
    const token = await this.jwtService.signAsync(
      {
        _id: existedUser._id,
        email: existedUser._id,
        username: data.username,
      },
      {
        expiresIn: '1d',
      }
    )

    return { token: token }
  }

  public async signIn(data: SignInDto) {
    const existedUser = await this.userRepo.findOneByCondition({
      email: data.email,
    })
    if (
      existedUser &&
      (Status_User.active === existedUser.status ||
        Status_User.lock === existedUser.status)
    )
      throw new BadGatewayException(AUTH_ERROR.USER_ALREADY_EXISTED)

    await this.userRepo.delete({ email: data.email })

    const newUser = await this.userRepo.create(data)

    const token = await this.jwtService.signAsync(
      {
        _id: newUser._id,
        email: newUser._id,
      },
      {
        expiresIn: '5m',
      }
    )

    await NodeMailerLib.send(
      {
        from: process.env.ADMIN_EMAIL_ADDRESS,
        to: data.email,
        text: token,
        subject: 'Verify K10-app',
      },
      () => {}
    )

    return { user: newUser, code: token }
  }

  public async verifyUser(code: string) {
    const payload = await this.jwtService.verifyAsync(code, {
      secret: JWT_SECRET,
    })

    return await this.userRepo.updateOne(
      { _id: payload['_id'] },
      { status: Status_User.active }
    )
  }
}

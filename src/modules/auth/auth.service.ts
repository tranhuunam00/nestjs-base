import { LoginDto, SignInDto } from './dto/auth.dto'
import { UserRepositories } from '../users/user.repositories'
import { AUTH_ERROR } from 'src/core/constants/errorMessage'
import { NodeMailerLib } from 'src/lib/nodemailer.lib'
import { Status_User } from 'src/models/user.model'
import { JWT_SECRET } from 'src/core/constants'
import { comparePassword, hashPassword } from 'src/lib/bcrypt.lib'
import { BadGatewayException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepositories,
    private jwtService: JwtService
  ) {}

  public async login(data: LoginDto) {
    const existedUser = await this.userRepo.findOneByCondition({
      email: data.email,
      status: Status_User.active,
    })

    if (!existedUser) {
      throw new BadGatewayException(AUTH_ERROR.USER_NOT_EXISTED)
    }

    const checkPassword = await comparePassword(
      existedUser.password,
      data.password
    )
    if (!checkPassword) {
      throw new BadGatewayException(AUTH_ERROR.PASSWORD_NOT_MATCH)
    }

    const token = await this.jwtService.signAsync(
      {
        _id: existedUser._id,
        email: existedUser.email,
      },
      {
        expiresIn: '1d',
      }
    )

    return { token: token }
  }

  public async signIn(data: SignInDto & { avatarUrl?: string }) {
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
    console.log('qiaaa')
    const hash = await hashPassword(data.password)

    const saveData = { ...data, password: hash }

    const newUser = await this.userRepo.create(saveData)

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
        text: process.env.ENDPOINT + '/api/auth/verify?code=' + token,
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

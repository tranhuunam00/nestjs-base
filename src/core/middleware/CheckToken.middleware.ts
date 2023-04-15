import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { AUTH_ERROR } from '../constants/errorMessage'
import { JwtService } from '@nestjs/jwt'
import { UserRepositories } from 'src/modules/users/user.repositories'
import { UserRequestProvider } from 'src/global/userGlobal.provider'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepositories,
    private readonly userRequestProvider: UserRequestProvider
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]
    if (token) {
      const data = this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY_ADMIN,
      })
      if (!data) throw new BadRequestException(AUTH_ERROR.TOKEN_NOT_VALUE)
      next()
    } else {
      throw new BadRequestException(AUTH_ERROR.TOKEN_NOT_VALUE)
    }
  }
}

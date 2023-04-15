import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AUTH_ERROR } from '../constants/errorMessage'
import { UserRequestProvider } from '../../global/userGlobal.provider'
import { ROLES } from '../constants'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private userRequestProvider: UserRequestProvider,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<number[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }

    const user = this.userRequestProvider.userRequest
    if (user.type === ROLES.ADMIN) return true
    return this.matchRoles(roles, user.type)
  }

  matchRoles(roles: number[], userRole: number) {
    if (roles.includes(userRole)) return true
    throw new UnauthorizedException(AUTH_ERROR.NOT_PERMISSION)
  }
}

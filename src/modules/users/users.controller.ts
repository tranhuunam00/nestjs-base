import { Controller, Get, HttpCode, Inject, Res } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserRequestProvider } from 'src/global/userGlobal.provider'
import { Roles } from 'src/core/decorator/Role.decorator'
import { ROLES } from 'src/core/constants'

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(UserRequestProvider)
    private readonly userRequestProvider: UserRequestProvider
  ) {}

  @Get('profile')
  profile() {
    return this.userRequestProvider.userRequest
  }

  @Roles([ROLES.USER])
  @Get('listBasicInfoUser')
  listBasicInfoUser() {
    return this.userRequestProvider.userRequest
  }
}

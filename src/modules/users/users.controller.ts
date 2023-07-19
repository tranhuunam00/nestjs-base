import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UserRequestProvider } from 'src/global/userGlobal.provider'
import { Roles } from 'src/core/decorator/Role.decorator'
import { ROLES } from 'src/core/constants'
import { Sex, UserProp } from 'src/models/user.model'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { BaseUserDto } from './dto/user.dto'
import { uploadGgDrive } from 'src/lib/google_drive.lib'
import { FileInterceptor } from '@nestjs/platform-express'
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject(UserRequestProvider)
    private readonly userRequestProvider: UserRequestProvider
  ) {}

  @Get('profile')
  profile() {
    console.log(this.userRequestProvider.userRequest)
    return this.userRequestProvider.userRequest
  }

  @Post('profile/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        sex: { type: 'string' },
        dOB: { type: 'integer' },
        password: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async updateProfile(
    @Param() id: string,
    @Body() data: BaseUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    let avatarUrl: string
    if (file) {
      avatarUrl = await uploadGgDrive(file)
    }
    console.log({ ...data, avatarUrl })
    // return await this.usersService.updateProfile(id, { ...data, avatarUrl })
  }

  @Roles([ROLES.USER])
  @Get('listBasicInfoUser')
  listBasicInfoUser() {
    return this.userRequestProvider.userRequest
  }
}

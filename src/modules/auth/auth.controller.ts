import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, SignInDto } from './dto/auth.dto'
import { uploadGgDrive } from 'src/lib/google_drive.lib'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data)
  }

  @Post('sign-in')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './path',
        filename: (req, file, cb) => {
          const fileExt =
            file.originalname.split('.')[
              file.originalname.split('.').length - 1
            ]
          cb(null, `${Date.now()}.${fileExt}`)
        },
      }),
    })
  )
  async SignIn(
    @Body() data: SignInDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    let avatarUrl: string
    if (file) {
      console.log(
        '🚀 ~ file: auth.controller.ts:35 ~ AuthController ~ file:',
        file
      )
      avatarUrl = await uploadGgDrive(file)
    }
    return await this.authService.signIn({ ...data, avatarUrl })
  }

  @Get('verify')
  verifyUser(@Query() data: { code: string }) {
    return this.authService.verifyUser(data.code)
  }
}

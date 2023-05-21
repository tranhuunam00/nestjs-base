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
import { FastifyFileInterceptor } from 'src/core/interceptor/fastify-file.interceptor'
import { diskStorage } from 'multer'
import { editFileName, imageFileFilter } from 'src/lib/multer.lib'
import { uploadGgDrive } from 'src/lib/google_drive.lib'

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
    FastifyFileInterceptor('image', {
      storage: diskStorage({
        destination: './upload/single',
        filename: editFileName,
      }),

      fileFilter: imageFileFilter,
    })
  )
  async SignIn(
    @Body() data: SignInDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    let avatarUrl: string
    if (file) {
      avatarUrl = await uploadGgDrive(file)
    }
    return await this.authService.signIn({ ...data, avatarUrl })
  }

  @Get('verify')
  verifyUser(@Query() data: { code: string }) {
    return this.authService.verifyUser(data.code)
  }
}

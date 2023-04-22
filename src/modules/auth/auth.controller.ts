import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto, SignInDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data)
  }

  @Post('sign-in')
  async SignIn(@Body() data: SignInDto) {
    return await this.authService.signIn(data)
  }

  @Get('verify')
  verifyUser(@Query() data: { code: string }) {
    return this.authService.verifyUser(data.code)
  }
}

import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
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
}

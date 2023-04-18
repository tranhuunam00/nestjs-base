import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { NodeMailerLib } from './lib/nodemailer.lib'
import { CONFIG_APP } from './core/constants'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getVersion(): Promise<string> {
    return '2'
  }

  @Get('send=mail')
  async send(): Promise<string> {
    NodeMailerLib.send(
      {
        from: CONFIG_APP.EMAIL.ADMIN_EMAIL_ADDRESS,
        // to: job.data.toEmail,
        to: 'tranhuunam23022000@gmail.com',
        subject: 'send to k10',
        text: 'welcome',
      },
      async (error, response) => {}
    )
    return '2'
  }
}

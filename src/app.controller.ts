import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { AppService } from './app.service'
import { NodeMailerLib } from './lib/nodemailer.lib'
import { CONFIG_APP } from './core/constants'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getVersion(): Promise<string> {
    return '2'
  }

  @Get('send-mail')
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

  @Post('up-load')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    // return this.promotionService.create(data)
    console.log(file)
  }
}

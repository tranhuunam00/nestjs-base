import {
  Body,
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
import { PdfLid } from './lib/pdf'
import {
  generateResponseCHATGPT,
  generateResponseCHATGPTByChat,
} from './lib/ChatGPTLib'

const pdfLid = new PdfLid('./path')
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

  @Get('up-load')
  alright() {
    // return this.promotionService.create(data)
    return "--alright"
  }

  @Post('upload-paper')
  @UseInterceptors(
    FileInterceptor('paper', {
      fileFilter: (req, file, cb) => {
        const parse = file.originalname.split('.')
        console.log('parse ', parse)
        file.filename = new Date().getTime + '.' + parse[parse.length - 1]
        cb(null, true)
      },
    })
  )
  async uploadPaper(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    data: {
      pages: string
    }
  ) {
    const listPages: number[] = JSON.parse(data.pages).sort((a, b) => a - b)
    const textList = await Promise.all(
      listPages.map(page => pdfLid.textExtract(file?.path, page))
    )

    return listPages.reduce(
      (pre, cur, index) => pre + '   TRANG  ' + cur + '   ' + textList[index],
      ''
    )
  }

  @Post('chat')
  async chat(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    data: {
      messages: string
    }
  ) {
    const response = await generateResponseCHATGPTByChat(
      JSON.parse(data.messages)
    )
    // return response
    console.log('response ', response)
    return response.message.content
  }
}

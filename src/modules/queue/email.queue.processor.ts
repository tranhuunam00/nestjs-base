import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { NodeMailerLib } from 'src/lib/nodemailer.lib'
import { CONFIG_APP, QUEUE_PROCESS_NAME } from 'src/core/constants'

@Processor('gmail')
export class GmailProcessor {
  constructor() {}

  @Process(QUEUE_PROCESS_NAME.SEND_MAIL)
  handleTranscode(job: Job) {
    NodeMailerLib.send(
      {
        from: CONFIG_APP.EMAIL.ADMIN_EMAIL_ADDRESS,
        // to: job.data.toEmail,
        to: 'tranhuunam23022000@gmail.com',
        subject: job.data.subject,
        text: job.data.content,
      },
      async (error, response) => {}
    )
  }
}

import * as nodemailer from 'nodemailer'
import { getAccessTokenGoogle } from './google.lib'
import { CONFIG_APP } from 'src/core/constants'

export class NodeMailerLib {
  public static async send(
    data: {
      to: string
      subject: string
      text: string
      from: string
    },
    callback: (error, response) => void
  ): Promise<void> {
    const accessToken = await getAccessTokenGoogle()
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: CONFIG_APP.EMAIL.ADMIN_EMAIL_ADDRESS,
        clientId: CONFIG_APP.EMAIL.GOOGLE_MAILER_CLIENT_ID,
        clientSecret: CONFIG_APP.EMAIL.GOOGLE_MAILER_CLIENT_SECRET,
        refreshToken: CONFIG_APP.EMAIL.GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    })
    const mailOptions = {
      to: data.to,
      subject: data.subject,
      html: `<h3>${data.text}</h3>`,
    }
    await transporter.sendMail(mailOptions, callback)
  }
}

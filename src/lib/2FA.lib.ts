import { authenticator } from 'otplib'
import * as QRCode from 'qrcode'

export const verify = (token: string, secret: string): boolean => {
    return authenticator.verify({ token, secret })
}

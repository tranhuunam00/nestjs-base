import { verify } from 'src/lib/2FA.lib'

export const verify2FA = (secret: string, optToken: string): boolean => {
    return verify(optToken, secret)
}

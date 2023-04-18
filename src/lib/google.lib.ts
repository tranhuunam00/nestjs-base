import { OAuth2Client } from 'google-auth-library'
import { CONFIG_APP } from 'src/core/constants'

const myOAuth2Client = new OAuth2Client(
    CONFIG_APP.EMAIL.GOOGLE_MAILER_CLIENT_ID,
    CONFIG_APP.EMAIL.GOOGLE_MAILER_CLIENT_SECRET
)

myOAuth2Client.setCredentials({
    refresh_token: CONFIG_APP.EMAIL.GOOGLE_MAILER_REFRESH_TOKEN,
})
console.log(CONFIG_APP.EMAIL.GOOGLE_MAILER_REFRESH_TOKEN)

export const getAccessTokenGoogle = async () => {
    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    return myAccessTokenObject?.token
}

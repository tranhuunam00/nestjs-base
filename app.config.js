const dotenv = require('dotenv')
const path = require('path')

const environments = {
    prod: 'prod',
    staging: 'staging',
    dev: 'dev',
}
const getDotEnvConfig = nodeEnv => {
    if (nodeEnv === environments.prod)
        return {
            path: path.resolve(process.cwd(), '.env.prod'),
            env: environments.prod,
        }

    if (nodeEnv === environments.staging)
        return {
            path: path.resolve(process.cwd(), '.env.staging'),
            env: environments.staging,
        }

    if (nodeEnv === environments.dev)
        return {
            path: path.resolve(process.cwd(), '.env.dev'),
            env: environments.dev,
        }
    return {
        path: path.resolve(process.cwd(), '.env'),
        env: environments.dev,
    }
}

const { path: nodeEnvPath, env } = getDotEnvConfig(process.env.NODE_ENV)
dotenv.config({
    path: nodeEnvPath,
})

const CONFIG_APP = {
    EMAIL: {
        GOOGLE_MAILER_CLIENT_ID: process.env.GOOGLE_MAILER_CLIENT_ID,
        GOOGLE_MAILER_CLIENT_SECRET: process.env.GOOGLE_MAILER_CLIENT_SECRET,
        GOOGLE_MAILER_REFRESH_TOKEN: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
        ADMIN_EMAIL_ADDRESS: process.env.ADMIN_EMAIL_ADDRESS,
    },
    REDIS: {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT,
    },
}
module.exports = CONFIG_APP

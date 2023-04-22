import { SwaggerConfig } from 'src/swagger/swagger.interface'
export { CONFIG_APP } from './app.config'

export const SEQUELIZE = 'SEQUELIZE'
export const MONGOOSE = 'MONGOOSE'
export const DEVELOPMENT = 'development'
export const TEST = 'test'
export const PRODUCTION = 'production'
export const USER_REPOSITORY = 'USER_REPOSITORY'
export const POST_REPOSITORY = 'POST_REPOSITORY'

// database
export const COMMENT_MODEL = 'COMMENT_MODEL'
export const DATABASE_CONNECTION = 'DATABASE_CONNECTION'
export const POST_MODEL = 'POST_MODEL'
export const USER_MODEL = 'USER_MODEL'

//

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
}

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Company Service',
  description: 'Template',
  version: '1.0',
  tags: ['Template'],
}
export const QUEUE_NAME = {
  GMAIL: 'gmail',
}

export const QUEUE_PROCESS_NAME = {
  SEND_MAIL: 'SEND_MAIL',
}

export const JWT_SECRET = process.env.JWT_SECRET

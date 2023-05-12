import * as bcrypt from 'bcrypt'
const saltRounds = 10

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds)
}

export const comparePassword = async (
  hashPassword: string,
  password: string
) => {
  return await bcrypt.compare(password, hashPassword)
}

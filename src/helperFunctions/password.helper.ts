const bcrypt = require('bcrypt')

export const hashPassword = async (password: string) => {
  const saltRounds = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, saltRounds)
}

export const confirmPassword = async (password: string, hashedPass: string) => {
  return await bcrypt.compare(password, hashedPass)
}
const jwt = require('jsonwebtoken')
import config from '../config.keys'

export const decodeToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    return decodedToken.id
  } catch(err) {
    return false
  }
}

export const createToken = (data) => {
  const token = jwt.sign({ id: data.userId }, config.JWT_SECRET,  { expiresIn: data.tokenLife })
  return token
}
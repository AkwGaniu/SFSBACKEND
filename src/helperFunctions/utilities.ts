import { PrismaClient } from ".prisma/client";
import { UserRole } from "@prisma/client";
import { request } from "express";
import { UserFormat } from "src/auth/interfaces/user.interface";
const prisma = new PrismaClient()

export const validEmail = (email: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  if (regex.test(email) === false) {
    return false
  } else {
    return true
  }
}

export const getSingleUser = async (userId: string): Promise<UserFormat> => {
  try {
    return await prisma.user.findUnique({
      where: {
        userId: userId
      }
    })
  } catch (error) {
    console.log(error.toString())
  }
}

export const setRole = (role) => {
  if (role.toUpperCase() === 'USER') {
    return UserRole.USER
  } else if (role.toUpperCase() === 'ADMIN') {
    return UserRole.ADMIN
  } else {
    return UserRole.USER
  }
}
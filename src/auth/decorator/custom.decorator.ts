import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient()
export const UserDecorator = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = await prisma.user.findUnique({
        where: {
            userId: data    
        }
    })
    if (user) return true
    console.log(data)
    return false;
  },
);
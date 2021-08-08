"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDecorator = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
exports.UserDecorator = common_1.createParamDecorator(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = await prisma.user.findUnique({
        where: {
            userId: data
        }
    });
    if (user)
        return true;
    console.log(data);
    return false;
});
//# sourceMappingURL=custom.decorator.js.map
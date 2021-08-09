"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRole = exports.getSingleUser = exports.validEmail = void 0;
const client_1 = require(".prisma/client");
const client_2 = require("@prisma/client");
const user_interface_1 = require("../auth/interfaces/user.interface");
const prisma = new client_1.PrismaClient();
const validEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
        return false;
    }
    else {
        return true;
    }
};
exports.validEmail = validEmail;
const getSingleUser = async (userId) => {
    try {
        return await prisma.user.findUnique({
            where: {
                userId: userId
            }
        });
    }
    catch (error) {
        console.log(error.toString());
    }
};
exports.getSingleUser = getSingleUser;
const setRole = (role) => {
    if (role.toUpperCase() === 'USER') {
        return client_2.UserRole.USER;
    }
    else if (role.toUpperCase() === 'ADMIN') {
        return client_2.UserRole.ADMIN;
    }
    else {
        return client_2.UserRole.USER;
    }
};
exports.setRole = setRole;
//# sourceMappingURL=utilities.js.map
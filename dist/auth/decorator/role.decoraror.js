"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRoles = void 0;
const common_1 = require("@nestjs/common");
const hasRoles = (...roles) => common_1.SetMetadata('roles', roles);
exports.hasRoles = hasRoles;
//# sourceMappingURL=role.decoraror.js.map
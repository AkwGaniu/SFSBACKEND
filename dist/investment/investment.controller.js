"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guards_1 = require("../auth/guards/jwt-auth.guards");
const permission_auth_guard_1 = require("../auth/guards/permission.auth.guard");
const response_interface_1 = require("../auth/interfaces/response.interface");
const custom_decorator_1 = require("../auth/decorator/custom.decorator");
const investment_service_1 = require("./investment.service");
const role_decoraror_1 = require("../auth/decorator/role.decoraror");
const client_1 = require(".prisma/client");
let InvestmentController = class InvestmentController {
    constructor(investmentServices) {
        this.investmentServices = investmentServices;
    }
    fetchUserInvestment(request) {
        return this.investmentServices.fetchUserInvestment(request.user.userId);
    }
};
__decorate([
    role_decoraror_1.hasRoles(client_1.UserRole.ADMIN, client_1.UserRole.USER),
    common_1.UseGuards(jwt_auth_guards_1.JwtAuthGuard, permission_auth_guard_1.AccessMe),
    common_1.Get('user_investment'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "fetchUserInvestment", null);
InvestmentController = __decorate([
    common_1.Controller('investment'),
    __metadata("design:paramtypes", [investment_service_1.InvestmentService])
], InvestmentController);
exports.InvestmentController = InvestmentController;
//# sourceMappingURL=investment.controller.js.map
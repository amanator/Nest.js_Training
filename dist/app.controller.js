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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth/auth.service");
const user_entity_1 = require("./users/user.entity");
const mongoose_2 = require("mongoose");
const createuser_dto_1 = require("./users/dto/createuser.dto");
const user_service_1 = require("./users/user.service");
let AppController = class AppController {
    constructor(authService, userModel, userService) {
        this.authService = authService;
        this.userModel = userModel;
        this.userService = userService;
    }
    async login(req) {
        let user = await this.userModel.findOne({ username: req.user.username }).exec();
        if (!user)
            throw new common_1.HttpException({ success: false, error: 'Internal Server Error' }, 400);
        const token = this.authService.generateToken({ id: user.id });
        return { success: true, authtoken: token };
    }
    async signup(user) {
        let newUser = await this.userService.signUp(user);
        const token = this.authService.generateToken({ id: newUser.id });
        return { success: true, authtoken: token };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local")),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createuser_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signup", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [auth_service_1.AuthService, mongoose_2.Model, user_service_1.UserService])
], AppController);
//# sourceMappingURL=app.controller.js.map
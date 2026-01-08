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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const users_service_1 = require("./users.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let UsersController = class UsersController {
    constructor(usersService, cloudinaryService) {
        this.usersService = usersService;
        this.cloudinaryService = cloudinaryService;
    }
    async uploadAvatar(id, file) {
        try {
            const result = await this.cloudinaryService.uploadImage(file);
            const url = result.secure_url;
            const updatedUser = await this.usersService.updateAvatar(id, url);
            return { success: true, user: updatedUser };
        }
        catch (error) {
            console.error("Cloudinary Upload Error:", error);
            throw new common_1.HttpException(`Rasm yuklashda xatolik: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserById(id) {
        console.log(`🔹 GET /users/${id} request received`);
        try {
            const user = await this.usersService.findById(id);
            if (!user) {
                console.warn(`❌ User not found with ID: ${id}`);
                throw new common_1.HttpException('Foydalanuvchi topilmadi', common_1.HttpStatus.NOT_FOUND);
            }
            console.log(`✅ User found: ${user.fullName}, Verified: ${user.isVerifiedStudent}`);
            return { success: true, user };
        }
        catch (error) {
            console.error(`❌ Error in getUserById: ${error.message}`);
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyStudent(body) {
        try {
            const { userId, hemisUrl } = body;
            const updatedUser = await this.usersService.updateVerificationWithUrl(userId, hemisUrl);
            return { success: true, user: updatedUser };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.CONFLICT);
        }
    }
    async updateProfile(id, body) {
        try {
            const updatedUser = await this.usersService.updateProfile(id, body);
            return { success: true, user: updatedUser };
        }
        catch (error) {
            throw new common_1.HttpException('Profilni yangilashda xatolik', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async uploadCV(id, file) {
        try {
            const result = await this.cloudinaryService.uploadFile(file);
            const url = result.secure_url;
            const updatedUser = await this.usersService.updateCV(id, url);
            return { success: true, cvUrl: url, user: updatedUser };
        }
        catch (error) {
            console.error("CV Upload Error:", error);
            throw new common_1.HttpException(`CV yuklashda xatolik: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(':id/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyStudent", null);
__decorate([
    (0, common_1.Post)(':id/profile'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)(':id/cv'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadCV", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        cloudinary_service_1.CloudinaryService])
], UsersController);
//# sourceMappingURL=users.controller.js.map
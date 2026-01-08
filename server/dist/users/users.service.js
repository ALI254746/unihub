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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const puppeteer = require("puppeteer");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    async findByGoogleId(googleId) {
        return this.userModel.findOne({ googleId });
    }
    async create(userData) {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
    async findByStudentHemisId(studentHemisId) {
        return this.userModel.findOne({ studentHemisId });
    }
    async findById(id) {
        return this.userModel.findById(id);
    }
    async findLatest() {
        return this.userModel.findOne().sort({ _id: -1 });
    }
    async fetchHemisData(url) {
        console.log('🔹 Scraping HEMIS Data via Puppeteer:', url);
        let browser = null;
        try {
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            console.log('🔹 Navigating to page...');
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
            console.log('✅ Page Loaded. Extracting data...');
            const result = await page.evaluate(() => {
                const data = {};
                const labelElements = document.querySelectorAll('.opacity-75');
                labelElements.forEach((el) => {
                    const labelText = el.textContent.trim();
                    const valueEl = el.nextElementSibling;
                    if (valueEl) {
                        const value = valueEl.textContent.trim();
                        if (labelText.includes('Familiya'))
                            data.fullName = value;
                        if (labelText.includes('muassasi'))
                            data.universityName = value;
                        if (labelText.includes('Mutaxassislik'))
                            data.specialty = value;
                        if (labelText.includes('Fakultet'))
                            data.faculty = value;
                        if (labelText.includes('bosqichi') || labelText.includes('Kurs'))
                            data.level = value;
                        if (labelText.includes('Daraja'))
                            data.degree = value;
                        if (labelText.includes('Ta\'lim shakli') || labelText.includes('Talim shakli') || (labelText.includes('shakli') && !labelText.includes('To')))
                            data.educationType = value;
                        if (labelText.includes('To\'lov') || labelText.includes('To‘lov') || labelText.includes('Moliya'))
                            data.paymentForm = value;
                        if (labelText.includes('Guruh'))
                            data.group = value;
                        if (labelText.includes('ID'))
                            data.hemisId = value;
                    }
                });
                return data;
            });
            console.log('✅ Extracted Data:', result);
            if (!result.fullName) {
                throw new Error('Ma\'lumotlar topilmadi. Sahifa tuzilishi o\'zgargan bo\'lishi mumkin.');
            }
            const studentHemisId = result.hemisId || url.split('/').pop();
            const finalData = {
                fullName: result.fullName,
                universityName: result.universityName,
                studentHemisId,
                studentData: {
                    faculty: result.faculty,
                    level: result.level,
                    degree: result.degree,
                    specialty: result.specialty,
                    educationType: result.educationType,
                    paymentForm: result.paymentForm,
                    group: result.group,
                }
            };
            console.log('✅ Final Parsed Data (Puppeteer):', finalData);
            return finalData;
        }
        catch (error) {
            console.error('❌ Puppeteer Scraping Error:', error.message);
            throw new Error('HEMIS ma\'lumotlarini olib bo\'lmadi. Qayta urinib ko\'ring.');
        }
        finally {
            if (browser)
                await browser.close();
        }
    }
    async updateVerificationWithUrl(userId, hemisUrl) {
        const hemisData = await this.fetchHemisData(hemisUrl);
        const existingStudent = await this.findByStudentHemisId(hemisData.studentHemisId);
        if (existingStudent && existingStudent._id.toString() !== userId) {
            throw new common_1.ConflictException('Bu talaba guvohnomasi allaqachon boshqa foydalanuvchi tomonidan ro\'yxatdan o\'tkazilgan!');
        }
        return this.userModel.findByIdAndUpdate(userId, {
            isVerifiedStudent: true,
            studentHemisId: hemisData.studentHemisId,
            universityName: hemisData.universityName,
            fullName: hemisData.fullName,
            studentData: hemisData.studentData,
        }, { new: true });
    }
    async updateAvatar(userId, avatarUrl) {
        return this.userModel.findByIdAndUpdate(userId, { avatarUrl }, { new: true });
    }
    async updateProfile(userId, updateData) {
        const safeUpdate = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (updateData.bio && { bio: updateData.bio })), (updateData.location && { location: updateData.location })), (updateData.skills && { skills: updateData.skills })), (updateData.socials && { socials: updateData.socials })), (updateData.timeline && { timeline: updateData.timeline }));
        return this.userModel.findByIdAndUpdate(userId, safeUpdate, { new: true });
    }
    async updateCV(userId, cvUrl) {
        return this.userModel.findByIdAndUpdate(userId, { cvUrl }, { new: true });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map
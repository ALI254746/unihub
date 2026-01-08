import { Controller, Post, Body, Req, UseGuards, HttpException, HttpStatus, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    try {
        const result = await this.cloudinaryService.uploadImage(file);
        // @ts-ignore
        const url = result.secure_url;
        
        const updatedUser = await this.usersService.updateAvatar(id, url);
        return { success: true, user: updatedUser };
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new HttpException(`Rasm yuklashda xatolik: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    console.log(`🔹 GET /users/${id} request received`);
    try {
      const user = await this.usersService.findById(id);
      if (!user) {
         console.warn(`❌ User not found with ID: ${id}`);
         throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
      }
      console.log(`✅ User found: ${user.fullName}, Verified: ${user.isVerifiedStudent}`);
      return { success: true, user };
    } catch (error) {
       console.error(`❌ Error in getUserById: ${error.message}`);
       throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify')
  async verifyStudent(@Body() body: any) {
    try {
      const { userId, hemisUrl } = body;
      
      const updatedUser = await this.usersService.updateVerificationWithUrl(
        userId,
        hemisUrl
      );

      return { success: true, user: updatedUser };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
  @Post(':id/profile')
  async updateProfile(@Param('id') id: string, @Body() body: any) {
    try {
        const updatedUser = await this.usersService.updateProfile(id, body);
        return { success: true, user: updatedUser };
    } catch (error) {
        throw new HttpException('Profilni yangilashda xatolik', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':id/cv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCV(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    try {
        const result = await this.cloudinaryService.uploadFile(file);
        // @ts-ignore
        const url = result.secure_url;
        
        const updatedUser = await this.usersService.updateCV(id, url);
        return { success: true, cvUrl: url, user: updatedUser };
    } catch (error) {
        console.error("CV Upload Error:", error);
        throw new HttpException(`CV yuklashda xatolik: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

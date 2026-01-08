import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('🔹 /auth/google endpoint hit');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log('🔹 /auth/google/callback endpoint hit');
    console.log('🔹 User from Google:', req.user);
    
    try {
      const user = await this.authService.validateUser(req.user);
      console.log('✅ User validated:', user.email);
      
      // if (user.isVerifiedStudent) {
      //     console.log('➡ Redirecting to Dashboard');
      //     return res.redirect(`http://localhost:3000/dashboard?uid=${user._id}`);
      // } else {
          console.log('➡ Redirecting to Verify Page');
          return res.redirect(`http://localhost:3000/register/verify?uid=${user._id}`);
      // }
    } catch (err) {
      console.error('❌ Error in googleAuthRedirect:', err);
      return res.status(500).send('Authentication failed');
    }
  }
}

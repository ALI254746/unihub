import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(details: any) {
    const user = await this.usersService.findByEmail(details.email);
    if (user) return user;
    
    // Create new user if not exists
    const newUser = await this.usersService.create({
      email: details.email,
      fullName: details.fullName,
      avatarUrl: details.picture,
      googleId: details.googleId,
    });
    return newUser;
  }
}

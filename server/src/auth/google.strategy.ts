import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:4000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('🔹 GoogleStrategy.validate called. Profile ID:', profile.id);
    const { name, emails, photos, displayName } = profile;
    const user = {
      email: emails[0].value,
      fullName: displayName || `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      googleId: profile.id,
      accessToken,
    };
    done(null, user);
  }
}

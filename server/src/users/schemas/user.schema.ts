import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, index: true })
  email: string;

  @Prop({ unique: true })
  googleId: string;

  @Prop()
  fullName: string;

  @Prop()
  avatarUrl: string;



  @Prop()
  cvUrl: string;

  @Prop()
  bio: string;

  @Prop()
  location: string;

  @Prop([String])
  skills: string[];

  @Prop({ type: Object })
  socials: {
      linkedin?: string;
      github?: string;
      website?: string;
  };

  @Prop({ type: Object })
  stats: {
      projects: number;
      followers: number;
      likes: string;
  };

  @Prop({ type: [Object] })
  timeline: Record<string, any>[];

  // VERIFICATION DATA
  @Prop({ default: false })
  isVerifiedStudent: boolean;

  @Prop({ unique: true, sparse: true })
  studentHemisId: string; // 3802211...

  @Prop()
  universityName: string;

  @Prop({ type: Object })
  studentData: {
    faculty?: string;
    level?: string;
    degree?: string;
    paymentForm?: string;
    gpa?: number;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

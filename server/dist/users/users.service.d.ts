import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findByEmail(email: string): Promise<UserDocument | undefined>;
    findByGoogleId(googleId: string): Promise<UserDocument | undefined>;
    create(userData: Partial<User>): Promise<UserDocument>;
    findByStudentHemisId(studentHemisId: string): Promise<UserDocument | undefined>;
    findById(id: string): Promise<UserDocument | undefined>;
    findLatest(): Promise<UserDocument | undefined>;
    fetchHemisData(url: string): Promise<{
        fullName: any;
        universityName: any;
        studentHemisId: any;
        studentData: {
            faculty: any;
            level: any;
            degree: any;
            specialty: any;
            educationType: any;
            paymentForm: any;
            group: any;
        };
    }>;
    updateVerificationWithUrl(userId: string, hemisUrl: string): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, import("mongoose").DefaultSchemaOptions> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateAvatar(userId: string, avatarUrl: string): Promise<UserDocument>;
    updateProfile(userId: string, updateData: any): Promise<UserDocument>;
    updateCV(userId: string, cvUrl: string): Promise<UserDocument>;
}

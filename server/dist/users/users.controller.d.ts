import { UsersService } from './users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class UsersController {
    private readonly usersService;
    private readonly cloudinaryService;
    constructor(usersService: UsersService, cloudinaryService: CloudinaryService);
    uploadAvatar(id: string, file: Express.Multer.File): Promise<{
        success: boolean;
        user: import("./schemas/user.schema").UserDocument;
    }>;
    getUserById(id: string): Promise<{
        success: boolean;
        user: import("./schemas/user.schema").UserDocument;
    }>;
    verifyStudent(body: any): Promise<{
        success: boolean;
        user: import("mongoose").Document<unknown, {}, import("./schemas/user.schema").UserDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    updateProfile(id: string, body: any): Promise<{
        success: boolean;
        user: import("./schemas/user.schema").UserDocument;
    }>;
    uploadCV(id: string, file: Express.Multer.File): Promise<{
        success: boolean;
        cvUrl: any;
        user: import("./schemas/user.schema").UserDocument;
    }>;
}

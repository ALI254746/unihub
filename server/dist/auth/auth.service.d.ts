import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    validateUser(details: any): Promise<import("../users/schemas/user.schema").UserDocument>;
}

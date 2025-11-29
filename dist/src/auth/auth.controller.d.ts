import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(dto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        error: string;
    } | {
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
        error?: undefined;
    }>;
}

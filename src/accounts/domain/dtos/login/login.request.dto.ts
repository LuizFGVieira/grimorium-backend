import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginRequestDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string; 
}
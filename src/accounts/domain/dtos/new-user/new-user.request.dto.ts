import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { RpgExperience } from "src/accounts/common/types/rgp-experience.type";

export class NewUserRequestDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;


    @IsString()
    @IsNotEmpty()
    name: string;


    @IsDateString()
    @IsNotEmpty()
    birthdate: Date;


    @IsEnum(RpgExperience)
    @IsNotEmpty()
    rpgExperience: RpgExperience;

    @IsBoolean()
    @IsNotEmpty()
    isPlayer: boolean;

    @IsBoolean()
    @IsNotEmpty()
    isMaster: boolean;
}
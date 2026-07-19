import { IsEmail, IsString, IsOptional, IsEnum, IsDateString, MinLength, MaxLength, Matches } from 'class-validator';
import { UserType, Gender } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Matches(/^[+]?[0-9]{10,15}$/)
  phoneNumber?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;
}

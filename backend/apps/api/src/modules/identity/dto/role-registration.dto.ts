import { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional, Matches } from 'class-validator';

export enum RegistrationRole {
  BUYER = 'BUYER',
  TENANT = 'TENANT',
  LANDLORD = 'LANDLORD',
  AGENT = 'AGENT',
  DEVELOPER = 'DEVELOPER',
}

export class BaseRegistrationDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

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
  @IsString()
  @MaxLength(20)
  @Matches(/^[+]?[0-9]{10,15}$/)
  phoneNumber?: string;

  @IsEnum(RegistrationRole)
  role: RegistrationRole;
}

export class BuyerRegistrationDto extends BaseRegistrationDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  businessName?: string;
}

export class TenantRegistrationDto extends BaseRegistrationDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  businessName?: string;
}

export class LandlordRegistrationDto extends BaseRegistrationDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  businessName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  taxNumber?: string;
}

export class AgentRegistrationDto extends BaseRegistrationDto {
  @IsString()
  @MaxLength(200)
  agencyName: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  licenseNumber?: string;

  @IsString()
  @MaxLength(500)
  officeAddress: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  commissionRate?: string;
}

export class DeveloperRegistrationDto extends BaseRegistrationDto {
  @IsString()
  @MaxLength(200)
  companyName: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  cacNumber?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  website?: string;

  @IsString()
  @MaxLength(500)
  officeAddress: string;
}

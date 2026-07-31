import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { PrismaService } from '../../../database/prisma.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
import { RefreshTokenDto } from '../dto/refresh.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserStatus, UserType, RoleType } from '@prisma/client';
import { BaseRegistrationDto, RegistrationRole } from '../dto/role-registration.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { ResendEmailCodeDto } from '../dto/resend-email-code.dto';
import { EmailVerificationService } from './email-verification.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  async login(loginDto: LoginDto, response: Response): Promise<{ user: any }> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Account is not active');
    }

    // Get user roles
    const roles = await this.getUserRoles(user.id);

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, roles);

    // Set httpOnly cookies
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    response.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        roles,
      },
    };
  }

  async signup(signupDto: SignupDto, response: Response): Promise<{ user: any }> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(signupDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    // Create user
    const user = await this.userService.create({
      ...signupDto,
      password: hashedPassword,
    });

    // Assign default role (TENANT) - skip for now as role assignment needs proper implementation
    // const tenantRole = await this.roleService.findByName('TENANT');
    // if (tenantRole) {
    //   await this.assignRoleToUser(user.id, tenantRole.id);
    // }

    // Get user roles
    const roles = await this.getUserRoles(user.id);

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, roles);

    // Set httpOnly cookies
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    response.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        roles,
      },
    };
  }

  async registerWithRole(registrationDto: BaseRegistrationDto, response: Response): Promise<{ user: any }> {
    // Check if user already exists by email
    const existingUser = await this.userRepository.findByEmail(registrationDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Check if phone number already exists (if provided)
    if (registrationDto.phoneNumber) {
      const existingPhone = await this.prisma.user.findUnique({
        where: { phoneNumber: registrationDto.phoneNumber },
      });
      if (existingPhone) {
        throw new BadRequestException('User with this phone number already exists');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registrationDto.password, 10);

    // Map role to UserType
    const userType = this.mapRoleToUserType(registrationDto.role);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: registrationDto.email,
        password: hashedPassword,
        firstName: registrationDto.firstName,
        lastName: registrationDto.lastName,
        phoneNumber: registrationDto.phoneNumber,
        type: userType,
        status: UserStatus.ACTIVE,
      },
    });

    // Create profile
    const profile = await this.prisma.profile.create({
      data: {
        userId: user.id,
        type: registrationDto.role,
      },
    });

    // Create role-specific profile
    await this.createRoleSpecificProfile(profile.id, registrationDto.role, registrationDto);

    // Assign role to user
    await this.assignRoleToUser(user.id, registrationDto.role);

    // Get user roles
    const roles = await this.getUserRoles(user.id);

    // Generate email verification code
    try {
      await this.emailVerificationService.generateVerificationCode(user.id, user.email);
    } catch (error) {
      // Log error but don't fail registration
      console.error('Failed to generate email verification code:', error);
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, roles);

    // Set httpOnly cookies
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    response.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        roles,
      },
    };
  }

  async refresh(request: Request, response: Response): Promise<{ accessToken: string }> {
    const refreshToken = request.cookies?.refresh_token;
    
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken);

      // Generate new access token
      const accessToken = this.jwtService.sign({
        sub: payload.sub,
        email: payload.email,
        roles: payload.roles,
      });

      // Update access token cookie
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      response.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: !isDevelopment,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      });

      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string; resetToken?: string }> {
    const user = await this.userService.findByEmail(forgotPasswordDto.email);
    
    // Generate reset token (in production, this would be sent via email)
    const resetToken = this.jwtService.sign(
      { email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' }
    );

    // For now, just return the token (in production, send email)
    return { 
      message: 'Password reset token generated',
      resetToken // Remove this in production
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    try {
      // Verify reset token
      const payload = this.jwtService.verify(resetPasswordDto.token, {
        secret: process.env.JWT_SECRET,
      });

      // Validate passwords match
      if (resetPasswordDto.newPassword !== resetPasswordDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);

      // Get user by email and update password
      const user = await this.userRepository.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      await this.userRepository.update(user.id, { password: hashedPassword });

      return { message: 'Password reset successful' };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<{ success: boolean; message: string }> {
    return this.emailVerificationService.verifyCode(verifyEmailDto.email, verifyEmailDto.code);
  }

  async resendEmailCode(resendEmailCodeDto: ResendEmailCodeDto): Promise<{ message: string; code?: string }> {
    const result = await this.emailVerificationService.resendCode(resendEmailCodeDto.email);
    
    // For development, return the code if email sending failed
    if (!result.sent) {
      return {
        message: 'Verification code generated (email not sent - check console)',
        code: result.code,
      };
    }

    return {
      message: 'Verification code sent to your email',
    };
  }

  private async generateTokens(userId: string, email: string, roles: string[]) {
    const payload = {
      sub: userId,
      email,
      roles,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    });

    return { accessToken, refreshToken };
  }

  private async getUserRoles(userId?: string): Promise<string[]> {
    if (!userId) {
      return ['TENANT'];
    }
    
    // Query the user_roles table to get actual roles
    const userRoles = await this.prisma.userRole.findMany({
      where: { userId },
      include: {
        role: true,
      },
    });
    
    return userRoles.map((ur: any) => ur.role.name);
  }

  private mapRoleToUserType(role: RegistrationRole): UserType {
    switch (role) {
      case RegistrationRole.BUYER:
      case RegistrationRole.TENANT:
      case RegistrationRole.LANDLORD:
        return UserType.INDIVIDUAL;
      case RegistrationRole.AGENT:
        return UserType.AGENCY;
      case RegistrationRole.DEVELOPER:
        return UserType.BUSINESS;
      default:
        return UserType.INDIVIDUAL;
    }
  }

  private async createRoleSpecificProfile(profileId: string, role: RegistrationRole, dto: any): Promise<void> {
    switch (role) {
      case RegistrationRole.AGENT:
        await this.prisma.agentProfile.create({
          data: {
            profileId,
            agencyName: dto.agencyName,
            licenseNumber: dto.licenseNumber,
            officeAddress: dto.officeAddress,
            commissionRate: dto.commissionRate ? parseFloat(dto.commissionRate) : null,
          },
        });
        break;
      case RegistrationRole.DEVELOPER:
        await this.prisma.developerProfile.create({
          data: {
            profileId,
            companyName: dto.companyName,
            cacNumber: dto.cacNumber,
            website: dto.website,
            officeAddress: dto.officeAddress,
          },
        });
        break;
      case RegistrationRole.LANDLORD:
        await this.prisma.landlordProfile.create({
          data: {
            profileId,
            businessName: dto.businessName,
            taxNumber: dto.taxNumber,
          },
        });
        break;
      case RegistrationRole.BUYER:
        await this.prisma.buyerProfile.create({
          data: { profileId },
        });
        break;
      case RegistrationRole.TENANT:
        await this.prisma.tenantProfile.create({
          data: { profileId },
        });
        break;
    }
  }

  private async assignRoleToUser(userId: string, role: RegistrationRole): Promise<void> {
    // Find or create the role
    let roleRecord = await this.prisma.role.findFirst({
      where: { name: role },
    });

    if (!roleRecord) {
      roleRecord = await this.prisma.role.create({
        data: {
          name: role,
          type: role as RoleType,
          description: `${role} role`,
          isSystem: true,
        },
      });
    }

    // Assign role to user
    await this.prisma.userRole.create({
      data: {
        userId,
        roleId: roleRecord.id,
      },
    });
  }
}

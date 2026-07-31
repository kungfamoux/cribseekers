import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards, Request, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
import { RefreshTokenDto } from '../dto/refresh.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { BaseRegistrationDto } from '../dto/role-registration.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { ResendEmailCodeDto } from '../dto/resend-email-code.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful', type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto, @Res() response: any): Promise<{ user: any }> {
    return this.authService.login(loginDto, response);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Registration successful', type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User already exists' })
  async signup(@Body() signupDto: SignupDto, @Res() response: any): Promise<{ user: any }> {
    return this.authService.signup(signupDto, response);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Role-based registration' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Registration successful', type: AuthResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User already exists or invalid data' })
  async register(@Body() registrationDto: BaseRegistrationDto, @Res() response: any): Promise<{ user: any }> {
    return this.authService.registerWithRole(registrationDto, response);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Token refreshed successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid refresh token' })
  async refresh(@Req() request: any, @Res() response: any): Promise<{ accessToken: string }> {
    return this.authService.refresh(request, response);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Password reset token generated' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string; resetToken?: string }> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Password reset successful' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid or expired token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Logout successful' })
  async logout(@Res() response: any): Promise<{ message: string }> {
    // Clear auth cookies
    response.clearCookie('access_token', { path: '/' });
    response.clearCookie('refresh_token', { path: '/' });
    
    return { message: 'Logout successful' };
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify email with code' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Email verified successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid or expired code' })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<{ success: boolean; message: string }> {
    return this.authService.verifyEmail(verifyEmailDto);
  }

  @Post('resend-email-code')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend email verification code' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Verification code sent' })
  @ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests' })
  async resendEmailCode(@Body() resendEmailCodeDto: ResendEmailCodeDto): Promise<{ message: string; code?: string }> {
    return this.authService.resendEmailCode(resendEmailCodeDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User retrieved successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getMe(@Request() req: any): Promise<any> {
    // The JwtAuthGuard attaches the user to the request
    return req.user;
  }
}

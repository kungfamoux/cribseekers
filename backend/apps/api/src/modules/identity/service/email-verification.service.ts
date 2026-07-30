import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { VerificationStatus } from '@prisma/client';
import {
  EmailVerificationNotFoundException,
  EmailVerificationExpiredException,
  EmailVerificationAlreadyVerifiedException,
  EmailVerificationRateLimitException
} from '../exceptions/email-verification.exception';
import { EmailJSService } from './emailjs.service';

@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);
  private readonly CODE_EXPIRY_MINUTES = 15;
  private readonly RESEND_COOLDOWN_MINUTES = 2;

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailJSService: EmailJSService,
  ) {}

  async generateVerificationCode(userId: string, email: string): Promise<{ code: string; sent: boolean }> {
    this.logger.log(`Generating verification code for user ${userId}, email ${email}`);

    // Check if user is already verified
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.emailVerified) {
      throw new EmailVerificationAlreadyVerifiedException();
    }

    // Check resend cooldown
    const recentVerification = await this.prisma.emailVerification.findFirst({
      where: {
        userId,
        email,
        status: VerificationStatus.PENDING,
        createdAt: {
          gte: new Date(Date.now() - this.RESEND_COOLDOWN_MINUTES * 60 * 1000),
        },
      },
    });

    if (recentVerification) {
      throw new EmailVerificationRateLimitException();
    }

    // Revoke previous pending codes
    await this.prisma.emailVerification.updateMany({
      where: {
        userId,
        email,
        status: VerificationStatus.PENDING,
      },
      data: {
        status: VerificationStatus.REVOKED,
      },
    });

    // Generate new code
    const code = this.generateCode();
    const expiresAt = new Date(Date.now() + this.CODE_EXPIRY_MINUTES * 60 * 1000);

    const verification = await this.prisma.emailVerification.create({
      data: {
        userId,
        email,
        token: code,
        status: VerificationStatus.PENDING,
        expiresAt,
      },
    });

    this.logger.log(`Verification code generated: ${verification.id}`);

    // Send email
    const emailResult = await this.emailJSService.sendVerificationEmail(email, code);

    return {
      code,
      sent: emailResult.success,
    };
  }

  async verifyCode(email: string, code: string): Promise<{ success: boolean; message: string }> {
    this.logger.log(`Verifying code for email ${email}`);

    // Find pending verification
    const verification = await this.prisma.emailVerification.findFirst({
      where: {
        email,
        token: code,
        status: VerificationStatus.PENDING,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verification) {
      throw new EmailVerificationNotFoundException();
    }

    // Check expiration
    if (new Date() > verification.expiresAt) {
      await this.prisma.emailVerification.update({
        where: { id: verification.id },
        data: { status: VerificationStatus.EXPIRED },
      });
      throw new EmailVerificationExpiredException();
    }

    // Verify user
    await this.prisma.user.update({
      where: { id: verification.userId },
      data: { emailVerified: true },
    });

    // Mark verification as approved
    await this.prisma.emailVerification.update({
      where: { id: verification.id },
      data: {
        status: VerificationStatus.APPROVED,
        verifiedAt: new Date(),
      },
    });

    // Revoke other pending verifications for this user
    await this.prisma.emailVerification.updateMany({
      where: {
        userId: verification.userId,
        id: { not: verification.id },
        status: VerificationStatus.PENDING,
      },
      data: { status: VerificationStatus.REVOKED },
    });

    this.logger.log(`Email verified successfully for user ${verification.userId}`);

    return {
      success: true,
      message: 'Email verified successfully',
    };
  }

  async resendCode(email: string): Promise<{ code: string; sent: boolean }> {
    this.logger.log(`Resending verification code for email ${email}`);

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.emailVerified) {
      throw new EmailVerificationAlreadyVerifiedException();
    }

    return this.generateVerificationCode(user.id, email);
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}

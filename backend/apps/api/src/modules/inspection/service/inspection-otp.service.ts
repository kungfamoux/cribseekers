import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { InspectionRepository } from '../repository/inspection.repository';
import { InspectionValidator } from '../validators/inspection.validator';
import { InspectionOTPExpiredException } from '../exceptions/inspection.exception';
import { OTPResponseDto } from '../dto/otp-response.dto';

@Injectable()
export class InspectionOTPService {
  private readonly logger = new Logger(InspectionOTPService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly inspectionRepository: InspectionRepository,
  ) {}

  async generateOTP(inspectionId: string): Promise<OTPResponseDto> {
    this.logger.log(`Generating OTP for inspection ${inspectionId}`);

    const inspection = await this.inspectionRepository.findById(inspectionId);
    if (!inspection) {
      throw new Error('Inspection not found');
    }

    const existingOTP = await this.prisma.inspectionOTP.findUnique({
      where: { inspectionId },
    });

    if (existingOTP && InspectionValidator.isOTPValid(existingOTP.expiresAt, existingOTP.attemptCount)) {
      return this.toResponseDto(existingOTP);
    }

    const code = this.generateCode();
    const expiresAt = InspectionValidator.getOTPExpiry();

    const otp = await this.prisma.inspectionOTP.create({
      data: {
        inspectionId,
        code,
        expiresAt,
        attemptCount: 0,
      },
    });

    return this.toResponseDto(otp);
  }

  async validateOTP(inspectionId: string, code: string): Promise<boolean> {
    this.logger.log(`Validating OTP for inspection ${inspectionId}`);

    const otp = await this.prisma.inspectionOTP.findUnique({
      where: { inspectionId },
    });

    if (!otp) {
      return false;
    }

    if (!InspectionValidator.isOTPValid(otp.expiresAt, otp.attemptCount)) {
      throw new InspectionOTPExpiredException();
    }

    if (otp.code !== code) {
      await this.prisma.inspectionOTP.update({
        where: { id: otp.id },
        data: { attemptCount: otp.attemptCount + 1 },
      });
      return false;
    }

    await this.prisma.inspectionOTP.update({
      where: { id: otp.id },
      data: { usedAt: new Date() },
    });

    return true;
  }

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private toResponseDto(otp: any): OTPResponseDto {
    return {
      id: otp.id,
      inspectionId: otp.inspectionId,
      code: otp.code,
      expiresAt: otp.expiresAt,
      usedAt: otp.usedAt,
      attemptCount: otp.attemptCount,
      createdAt: otp.createdAt,
    };
  }
}

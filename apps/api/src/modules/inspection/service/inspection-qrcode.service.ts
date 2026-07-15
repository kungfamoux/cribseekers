import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { IInspectionRepository } from '../interfaces/inspection.repository.interface';
import { InspectionValidator } from '../validators/inspection.validator';
import { InspectionQRCodeExpiredException } from '../exceptions/inspection.exception';
import { QRCodeResponseDto } from '../dto/qrcode-response.dto';

@Injectable()
export class InspectionQRCodeService {
  private readonly logger = new Logger(InspectionQRCodeService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly inspectionRepository: IInspectionRepository,
  ) {}

  async generateQRCode(inspectionId: string): Promise<QRCodeResponseDto> {
    this.logger.log(`Generating QR code for inspection ${inspectionId}`);

    const inspection = await this.inspectionRepository.findById(inspectionId);
    if (!inspection) {
      throw new Error('Inspection not found');
    }

    const existingQR = await this.prisma.inspectionQRCode.findUnique({
      where: { inspectionId },
    });

    if (existingQR && InspectionValidator.isQRCodeValid(existingQR.expiresAt, existingQR.usedAt)) {
      return this.toResponseDto(existingQR);
    }

    const code = this.generateCode();
    const expiresAt = InspectionValidator.getQRCodeExpiry();

    const qrCode = await this.prisma.inspectionQRCode.create({
      data: {
        inspectionId,
        code,
        expiresAt,
      },
    });

    return this.toResponseDto(qrCode);
  }

  async validateQRCode(code: string): Promise<boolean> {
    this.logger.log(`Validating QR code ${code}`);

    const qrCode = await this.prisma.inspectionQRCode.findUnique({
      where: { code },
    });

    if (!qrCode) {
      return false;
    }

    if (!InspectionValidator.isQRCodeValid(qrCode.expiresAt, qrCode.usedAt)) {
      throw new InspectionQRCodeExpiredException();
    }

    return true;
  }

  async useQRCode(code: string): Promise<void> {
    this.logger.log(`Using QR code ${code}`);

    await this.prisma.inspectionQRCode.update({
      where: { code },
      data: { usedAt: new Date() },
    });
  }

  private generateCode(): string {
    return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64').substring(0, 16);
  }

  private toResponseDto(qrCode: any): QRCodeResponseDto {
    return {
      id: qrCode.id,
      inspectionId: qrCode.inspectionId,
      code: qrCode.code,
      expiresAt: qrCode.expiresAt,
      usedAt: qrCode.usedAt,
      createdAt: qrCode.createdAt,
    };
  }
}

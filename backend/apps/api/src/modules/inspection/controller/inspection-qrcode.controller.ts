import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InspectionQRCodeService } from '../service/inspection-qrcode.service';
import { QRCodeResponseDto } from '../dto/qrcode-response.dto';

@ApiTags('Inspection QR Codes')
@Controller('inspections/:inspectionId/qrcode')
export class InspectionQRCodeController {
  constructor(private readonly qrCodeService: InspectionQRCodeService) {}

  @Post()
  @ApiOperation({ summary: 'Generate QR code for inspection' })
  @ApiResponse({ status: 201, description: 'QR code generated successfully', type: QRCodeResponseDto })
  async generate(@Param('inspectionId') inspectionId: string): Promise<QRCodeResponseDto> {
    return this.qrCodeService.generateQRCode(inspectionId);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate QR code' })
  @ApiResponse({ status: 200, description: 'QR code validated successfully' })
  async validate(@Body('code') code: string): Promise<{ valid: boolean }> {
    const valid = await this.qrCodeService.validateQRCode(code);
    return { valid };
  }

  @Post('use')
  @ApiOperation({ summary: 'Mark QR code as used' })
  @ApiResponse({ status: 200, description: 'QR code marked as used' })
  async use(@Body('code') code: string): Promise<void> {
    await this.qrCodeService.useQRCode(code);
  }
}

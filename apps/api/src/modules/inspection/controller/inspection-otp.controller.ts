import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InspectionOTPService } from '../service/inspection-otp.service';
import { OTPResponseDto } from '../dto/otp-response.dto';

@ApiTags('Inspection OTP')
@Controller('inspections/:inspectionId/otp')
export class InspectionOTPController {
  constructor(private readonly otpService: InspectionOTPService) {}

  @Post()
  @ApiOperation({ summary: 'Generate OTP for inspection' })
  @ApiResponse({ status: 201, description: 'OTP generated successfully', type: OTPResponseDto })
  async generate(@Param('inspectionId') inspectionId: string): Promise<OTPResponseDto> {
    return this.otpService.generateOTP(inspectionId);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate OTP' })
  @ApiResponse({ status: 200, description: 'OTP validated successfully' })
  async validate(@Param('inspectionId') inspectionId: string, @Body('code') code: string): Promise<{ valid: boolean }> {
    const valid = await this.otpService.validateOTP(inspectionId, code);
    return { valid };
  }
}

import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BankAccountService } from '../service/bank-account.service';
import { BankAccountDto } from '../dto/bank-account.dto';
import { PaymentPaginationDto } from '../dto/payment-pagination.dto';

@ApiTags('Bank Accounts')
@Controller('bank-accounts')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  @ApiOperation({ summary: 'Create bank account' })
  @ApiResponse({ status: 201, description: 'Bank account created successfully' })
  async create(@Body() dto: BankAccountDto): Promise<any> {
    return this.bankAccountService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bank account by ID' })
  @ApiResponse({ status: 200, description: 'Bank account retrieved successfully' })
  async findById(@Param('id') id: string): Promise<any> {
    return this.bankAccountService.findById(id);
  }

  @Get('wallet/:walletId')
  @ApiOperation({ summary: 'Get bank accounts by wallet ID' })
  @ApiResponse({ status: 200, description: 'Bank accounts retrieved successfully' })
  async findByWalletId(
    @Param('walletId') walletId: string,
    @Query() pagination: PaymentPaginationDto,
  ): Promise<any> {
    return this.bankAccountService.findByWalletId(walletId, pagination);
  }

  @Post(':id/set-default')
  @ApiOperation({ summary: 'Set bank account as default' })
  @ApiResponse({ status: 200, description: 'Bank account set as default' })
  async setDefault(
    @Param('id') id: string,
    @Body('walletId') walletId: string,
  ): Promise<any> {
    return this.bankAccountService.setDefault(id, walletId);
  }

  @Post(':id/verify')
  @ApiOperation({ summary: 'Verify bank account' })
  @ApiResponse({ status: 200, description: 'Bank account verified successfully' })
  async verify(@Param('id') id: string): Promise<any> {
    return this.bankAccountService.verify(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bank account' })
  @ApiResponse({ status: 200, description: 'Bank account deleted successfully' })
  async delete(@Param('id') id: string): Promise<any> {
    return this.bankAccountService.delete(id);
  }
}

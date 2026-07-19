import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WalletService } from '../service/wallet.service';
import { WalletResponseDto } from '../dto/wallet-response.dto';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('users/:userId')
  @ApiOperation({ summary: 'Create wallet for user' })
  @ApiResponse({ status: 201, description: 'Wallet created successfully', type: WalletResponseDto })
  async createForUser(@Param('userId') userId: string): Promise<WalletResponseDto> {
    return this.walletService.createForUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet by ID' })
  @ApiResponse({ status: 200, description: 'Wallet retrieved successfully', type: WalletResponseDto })
  async findById(@Param('id') id: string): Promise<WalletResponseDto> {
    return this.walletService.findById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get wallet by user ID' })
  @ApiResponse({ status: 200, description: 'Wallet retrieved successfully', type: WalletResponseDto })
  async findByUserId(@Param('userId') userId: string): Promise<WalletResponseDto> {
    return this.walletService.findByUserId(userId);
  }

  @Post(':id/freeze')
  @ApiOperation({ summary: 'Freeze wallet' })
  @ApiResponse({ status: 200, description: 'Wallet frozen successfully' })
  async freezeWallet(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Body('frozenBy') frozenBy: string,
  ): Promise<WalletResponseDto> {
    return this.walletService.freezeWallet(id, reason, frozenBy);
  }

  @Post(':id/unfreeze')
  @ApiOperation({ summary: 'Unfreeze wallet' })
  @ApiResponse({ status: 200, description: 'Wallet unfrozen successfully' })
  async unfreezeWallet(@Param('id') id: string): Promise<WalletResponseDto> {
    return this.walletService.unfreezeWallet(id);
  }

  @Post(':id/close')
  @ApiOperation({ summary: 'Close wallet' })
  @ApiResponse({ status: 200, description: 'Wallet closed successfully' })
  async closeWallet(
    @Param('id') id: string,
    @Body('closedBy') closedBy: string,
  ): Promise<WalletResponseDto> {
    return this.walletService.closeWallet(id, closedBy);
  }
}

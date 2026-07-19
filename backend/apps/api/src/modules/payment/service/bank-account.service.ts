import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { BankAccountRepository } from '../repository/bank-account.repository';
import { BankAccountMapper } from '../mappers/bank-account.mapper';

@Injectable()
export class BankAccountService {
  private readonly logger = new Logger(BankAccountService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async create(dto: any): Promise<any> {
    this.logger.log(`Creating bank account for wallet ${dto.walletId}`);

    const bankAccountData = BankAccountMapper.toCreateInput(dto);
    const bankAccount = await this.prisma.$transaction(async (tx: any) => {
      const newBankAccount = await tx.bankAccount.create({
        data: bankAccountData,
      });

      if (dto.isDefault) {
        await tx.bankAccount.updateMany({
          where: {
            walletId: dto.walletId,
            id: { not: newBankAccount.id },
          },
          data: { isDefault: false },
        });
      }

      return newBankAccount;
    });

    this.logger.log(`Bank account created successfully: ${bankAccount.id}`);
    return BankAccountMapper.toEntity(bankAccount);
  }

  async findById(id: string): Promise<any> {
    const bankAccount = await this.bankAccountRepository.findById(id);
    if (!bankAccount) {
      throw new Error('Bank account not found');
    }
    return BankAccountMapper.toEntity(bankAccount);
  }

  async findByWalletId(walletId: string, options?: any): Promise<any> {
    return this.bankAccountRepository.findByWalletId(walletId, options);
  }

  async setDefault(id: string, walletId: string): Promise<any> {
    this.logger.log(`Setting bank account ${id} as default for wallet ${walletId}`);

    const bankAccount = await this.bankAccountRepository.findById(id);
    if (!bankAccount) {
      throw new Error('Bank account not found');
    }

    if (bankAccount.walletId !== walletId) {
      throw new Error('Bank account does not belong to this wallet');
    }

    await this.prisma.$transaction(async (tx: any) => {
      await tx.bankAccount.updateMany({
        where: { walletId },
        data: { isDefault: false },
      });

      await tx.bankAccount.update({
        where: { id },
        data: { isDefault: true },
      });
    });

    return this.findById(id);
  }

  async verify(id: string): Promise<any> {
    this.logger.log(`Verifying bank account ${id}`);

    const bankAccount = await this.bankAccountRepository.findById(id);
    if (!bankAccount) {
      throw new Error('Bank account not found');
    }

    const updatedBankAccount = await this.bankAccountRepository.update(id, {
      isVerified: true,
    });

    return BankAccountMapper.toEntity(updatedBankAccount);
  }

  async delete(id: string): Promise<any> {
    this.logger.log(`Deleting bank account ${id}`);

    const bankAccount = await this.bankAccountRepository.findById(id);
    if (!bankAccount) {
      throw new Error('Bank account not found');
    }

    if (bankAccount.isDefault) {
      throw new Error('Cannot delete default bank account');
    }

    await this.bankAccountRepository.delete(id);
    return { message: 'Bank account deleted successfully' };
  }
}

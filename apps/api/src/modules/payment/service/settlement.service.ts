import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ISettlementRepository } from '../interfaces/settlement.repository.interface';
import { IEscrowRepository } from '../interfaces/escrow.repository.interface';
import { SettlementMapper } from '../mappers/settlement.mapper';
import { PaymentValidator } from '../validators/payment.validator';
import { SettlementFailedException } from '../exceptions/payment.exception';
import { EscrowStatus } from '@prisma/client';

@Injectable()
export class SettlementService {
  private readonly logger = new Logger(SettlementService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly settlementRepository: ISettlementRepository,
    private readonly escrowRepository: IEscrowRepository,
  ) {}

  async create(escrowId: string): Promise<any> {
    this.logger.log(`Creating settlement for escrow ${escrowId}`);

    const escrow = await this.escrowRepository.findById(escrowId);
    if (!escrow) {
      throw new Error('Escrow not found');
    }

    if (!PaymentValidator.canCreateSettlement(escrow)) {
      throw new SettlementFailedException('Escrow must be released before settlement');
    }

    const existingSettlements = await this.settlementRepository.findByEscrowId(escrowId);
    if (existingSettlements.length > 0) {
      throw new SettlementFailedException('Settlement already exists for this escrow');
    }

    const settlementData = SettlementMapper.toCreateInput(escrowId, Number(escrow.amount));
    const settlement = await this.prisma.$transaction(async (tx: any) => {
      const newSettlement = await tx.settlement.create({
        data: {
          ...settlementData,
          status: 'PROCESSING',
        },
      });

      await tx.escrow.update({
        where: { id: escrowId },
        data: {
          status: EscrowStatus.RELEASED,
        },
      });

      return newSettlement;
    });

    this.logger.log(`Settlement created successfully: ${settlement.id}`);
    return SettlementMapper.toResponseDto(settlement);
  }

  async findById(id: string): Promise<any> {
    const settlement = await this.settlementRepository.findById(id);
    if (!settlement) {
      throw new Error('Settlement not found');
    }
    return SettlementMapper.toResponseDto(settlement);
  }

  async complete(settlementId: string, gatewayReference?: string): Promise<any> {
    this.logger.log(`Completing settlement ${settlementId}`);

    const settlement = await this.settlementRepository.findById(settlementId);
    if (!settlement) {
      throw new Error('Settlement not found');
    }

    const updatedSettlement = await this.settlementRepository.update(settlementId, {
      status: 'COMPLETED',
      settledAt: new Date(),
      gatewayReference,
    });

    return SettlementMapper.toResponseDto(updatedSettlement);
  }

  async findByEscrowId(escrowId: string): Promise<any[]> {
    const settlements = await this.settlementRepository.findByEscrowId(escrowId);
    return settlements.map((s) => SettlementMapper.toResponseDto(s));
  }
}

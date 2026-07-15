import { PropertyModeration } from '../entities/property-moderation.entity';
import { VerificationResponseDto } from '../dto/verification-response.dto';

export class PropertyModerationMapper {
  static toEntity(prismaModeration: any): PropertyModeration {
    const entity = new PropertyModeration();
    entity.id = prismaModeration.id;
    entity.propertyId = prismaModeration.propertyId;
    entity.status = prismaModeration.status;
    entity.reviewedBy = prismaModeration.reviewedBy;
    entity.reviewedAt = prismaModeration.reviewedAt;
    entity.rejectionReason = prismaModeration.rejectionReason;
    entity.notes = prismaModeration.notes;
    entity.createdAt = prismaModeration.createdAt;
    entity.updatedAt = prismaModeration.updatedAt;
    entity.deletedAt = prismaModeration.deletedAt;
    return entity;
  }

  static toResponseDto(entity: PropertyModeration): VerificationResponseDto {
    const dto = new VerificationResponseDto();
    dto.id = entity.id;
    dto.propertyId = entity.propertyId;
    dto.status = entity.status;
    dto.reviewedBy = entity.reviewedBy;
    dto.reviewedAt = entity.reviewedAt;
    dto.rejectionReason = entity.rejectionReason;
    dto.notes = entity.notes;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  static toCreateInput(propertyId: string, status: string): any {
    return {
      propertyId,
      status,
    };
  }

  static toUpdateInput(data: Partial<any>): any {
    const input: any = {};
    if (data.status !== undefined) input.status = data.status;
    if (data.reviewedBy !== undefined) input.reviewedBy = data.reviewedBy;
    if (data.reviewedAt !== undefined) input.reviewedAt = data.reviewedAt;
    if (data.rejectionReason !== undefined) input.rejectionReason = data.rejectionReason;
    if (data.notes !== undefined) input.notes = data.notes;
    return input;
  }
}

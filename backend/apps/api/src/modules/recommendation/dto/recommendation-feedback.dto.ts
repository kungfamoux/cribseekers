import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsIn } from 'class-validator';

export class RecommendationFeedbackDto {
  @ApiProperty({ description: 'Property ID' })
  @IsUUID()
  propertyId: string;

  @ApiProperty({ 
    description: 'Feedback type',
    enum: ['like', 'dislike', 'hide', 'save']
  })
  @IsString()
  @IsIn(['like', 'dislike', 'hide', 'save'])
  type: 'like' | 'dislike' | 'hide' | 'save';
}

import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  propertyId: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}

export class FavoriteResponseDto {
  id: string;
  propertyId: string;
  userId: string;
  notes?: string;
  createdAt: Date;
}

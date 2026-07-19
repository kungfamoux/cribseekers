import { ApiProperty } from '@nestjs/swagger';

export class InspectionReportDto {
  @ApiProperty({ description: 'Scheduled inspections' })
  scheduled: number;

  @ApiProperty({ description: 'Completed inspections' })
  completed: number;

  @ApiProperty({ description: 'Cancelled inspections' })
  cancelled: number;

  @ApiProperty({ description: 'Average completion time in minutes' })
  averageCompletionTime: number;

  @ApiProperty({ description: 'Inspector performance' })
  inspectorPerformance: InspectorStatsDto[];

  @ApiProperty({ description: 'Property inspection frequency' })
  propertyInspectionFrequency: PropertyInspectionStatsDto[];
}

export class InspectorStatsDto {
  @ApiProperty({ description: 'Inspector ID' })
  inspectorId: string;

  @ApiProperty({ description: 'Inspector name' })
  name: string;

  @ApiProperty({ description: 'Completed inspections' })
  completedInspections: number;

  @ApiProperty({ description: 'Average rating' })
  averageRating: number;

  @ApiProperty({ description: 'Average completion time in minutes' })
  averageCompletionTime: number;
}

export class PropertyInspectionStatsDto {
  @ApiProperty({ description: 'Property ID' })
  propertyId: string;

  @ApiProperty({ description: 'Property title' })
  title: string;

  @ApiProperty({ description: 'Inspection count' })
  inspectionCount: number;
}

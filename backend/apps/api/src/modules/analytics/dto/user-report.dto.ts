import { ApiProperty } from '@nestjs/swagger';

export class UserReportDto {
  @ApiProperty({ description: 'Registrations count' })
  registrations: number;

  @ApiProperty({ description: 'Verification status breakdown' })
  verificationStatus: Record<string, number>;

  @ApiProperty({ description: 'Login activity count' })
  loginActivity: number;

  @ApiProperty({ description: 'User growth data' })
  userGrowth: GrowthDataDto[];

  @ApiProperty({ description: 'Agent performance' })
  agentPerformance: AgentStatsDto[];

  @ApiProperty({ description: 'Landlord performance' })
  landlordPerformance: LandlordStatsDto[];

  @ApiProperty({ description: 'Tenant activity' })
  tenantActivity: TenantStatsDto[];

  @ApiProperty({ description: 'Top users' })
  topUsers: TopUserDto[];

  @ApiProperty({ description: 'Inactive users count' })
  inactiveUsers: number;
}

export class GrowthDataDto {
  @ApiProperty({ description: 'Date' })
  date: Date;

  @ApiProperty({ description: 'Count' })
  count: number;
}

export class AgentStatsDto {
  @ApiProperty({ description: 'Agent ID' })
  agentId: string;

  @ApiProperty({ description: 'Agent name' })
  name: string;

  @ApiProperty({ description: 'Properties listed' })
  propertiesListed: number;

  @ApiProperty({ description: 'Inspections completed' })
  inspectionsCompleted: number;

  @ApiProperty({ description: 'Revenue in NGN' })
  revenue: number;
}

export class LandlordStatsDto {
  @ApiProperty({ description: 'Landlord ID' })
  landlordId: string;

  @ApiProperty({ description: 'Landlord name' })
  name: string;

  @ApiProperty({ description: 'Properties listed' })
  propertiesListed: number;

  @ApiProperty({ description: 'Revenue in NGN' })
  revenue: number;

  @ApiProperty({ description: 'Average rating' })
  averageRating: number;
}

export class TenantStatsDto {
  @ApiProperty({ description: 'Tenant ID' })
  tenantId: string;

  @ApiProperty({ description: 'Tenant name' })
  name: string;

  @ApiProperty({ description: 'Inspections completed' })
  inspectionsCompleted: number;

  @ApiProperty({ description: 'Payments made in NGN' })
  paymentsMade: number;
}

export class TopUserDto {
  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'User name' })
  name: string;

  @ApiProperty({ description: 'Activity score' })
  activityScore: number;
}

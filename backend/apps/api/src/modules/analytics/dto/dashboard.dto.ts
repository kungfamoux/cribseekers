import { ApiProperty } from '@nestjs/swagger';

export class DashboardDto {
  @ApiProperty({ description: 'Total users on platform' })
  totalUsers: number;

  @ApiProperty({ description: 'Active users' })
  activeUsers: number;

  @ApiProperty({ description: 'New users in period' })
  newUsers: number;

  @ApiProperty({ description: 'Verified users' })
  verifiedUsers: number;

  @ApiProperty({ description: 'Total landlords' })
  landlords: number;

  @ApiProperty({ description: 'Total agents' })
  agents: number;

  @ApiProperty({ description: 'Total tenants' })
  tenants: number;

  @ApiProperty({ description: 'Properties listed' })
  propertiesListed: number;

  @ApiProperty({ description: 'Properties verified' })
  propertiesVerified: number;

  @ApiProperty({ description: 'Properties rented' })
  propertiesRented: number;

  @ApiProperty({ description: 'Properties available' })
  propertiesAvailable: number;

  @ApiProperty({ description: 'Featured properties' })
  featuredProperties: number;

  @ApiProperty({ description: 'Inspection requests' })
  inspectionRequests: number;

  @ApiProperty({ description: 'Completed inspections' })
  completedInspections: number;

  @ApiProperty({ description: 'Cancelled inspections' })
  cancelledInspections: number;

  @ApiProperty({ description: 'Total revenue in NGN' })
  totalRevenue: number;

  @ApiProperty({ description: 'Monthly recurring revenue in NGN' })
  monthlyRecurringRevenue: number;

  @ApiProperty({ description: 'Commission earned in NGN' })
  commissionEarned: number;

  @ApiProperty({ description: 'Average rent price in NGN' })
  averageRentPrice: number;

  @ApiProperty({ description: 'Average inspection completion time in minutes' })
  averageInspectionCompletionTime: number;

  @ApiProperty({ description: 'Average response time in minutes' })
  averageResponseTime: number;

  @ApiProperty({ description: 'Chat activity count' })
  chatActivity: number;

  @ApiProperty({ description: 'Search activity count' })
  searchActivity: number;

  @ApiProperty({ description: 'Recommendation engagement rate' })
  recommendationEngagement: number;
}

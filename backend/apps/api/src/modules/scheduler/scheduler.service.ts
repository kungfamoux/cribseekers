import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { PrismaService } from '../../database/prisma.service';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class SchedulerService implements OnModuleInit {
  private readonly logger = new Logger(SchedulerService.name);
  private readonly schedulerEnabled: boolean;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.schedulerEnabled = this.config.schedulerEnabled;
  }

  onModuleInit() {
    if (!this.schedulerEnabled) {
      this.logger.log('Scheduler is disabled');
      return;
    }
    this.logger.log('Scheduler initialized');
  }

  // Expired phone verification cleanup - runs every hour
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredPhoneVerifications() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting expired phone verification cleanup');
      
      const expiredVerifications = await this.prisma.phoneVerification.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      this.logger.log(`Cleaned up ${expiredVerifications.count} expired phone verifications`);
    } catch (error) {
      this.logger.error('Error cleaning up expired phone verifications:', error);
    }
  }

  // Expired email verification cleanup - runs every hour
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredEmailVerifications() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting expired email verification cleanup');
      
      const expiredVerifications = await this.prisma.emailVerification.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      this.logger.log(`Cleaned up ${expiredVerifications.count} expired email verifications`);
    } catch (error) {
      this.logger.error('Error cleaning up expired email verifications:', error);
    }
  }

  // Expired password reset token cleanup - runs every hour
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredPasswordResetTokens() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting expired password reset token cleanup');
      
      const expiredTokens = await this.prisma.passwordResetToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      this.logger.log(`Cleaned up ${expiredTokens.count} expired password reset tokens`);
    } catch (error) {
      this.logger.error('Error cleaning up expired password reset tokens:', error);
    }
  }

  // Expired session cleanup - runs every 6 hours
  @Cron(CronExpression.EVERY_6_HOURS)
  async cleanupExpiredSessions() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting expired session cleanup');
      
      const expiredSessions = await this.prisma.session.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      this.logger.log(`Cleaned up ${expiredSessions.count} expired sessions`);
    } catch (error) {
      this.logger.error('Error cleaning up expired sessions:', error);
    }
  }

  // Expired refresh token cleanup - runs every 6 hours
  @Cron(CronExpression.EVERY_6_HOURS)
  async cleanupExpiredRefreshTokens() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting expired refresh token cleanup');
      
      const expiredTokens = await this.prisma.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      this.logger.log(`Cleaned up ${expiredTokens.count} expired refresh tokens`);
    } catch (error) {
      this.logger.error('Error cleaning up expired refresh tokens:', error);
    }
  }

  // Expired inspection QR code cleanup - runs every hour
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredInspectionQRCodes() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting expired inspection QR code cleanup');
      
      const expiredQRCodes = await this.prisma.inspectionQRCode.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      this.logger.log(`Cleaned up ${expiredQRCodes.count} expired inspection QR codes`);
    } catch (error) {
      this.logger.error('Error cleaning up expired inspection QR codes:', error);
    }
  }

  // Expired inspection OTP cleanup - runs every hour
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredInspectionOTPs() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting expired inspection OTP cleanup');
      
      const expiredOTPs = await this.prisma.inspectionOTP.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      this.logger.log(`Cleaned up ${expiredOTPs.count} expired inspection OTPs`);
    } catch (error) {
      this.logger.error('Error cleaning up expired inspection OTPs:', error);
    }
  }

  // Expired signed URL cleanup - runs every hour
  @Cron(CronExpression.EVERY_HOUR)
  async cleanupExpiredSignedURLs() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting expired signed URL cleanup');
      
      // No-op for MVP - Redis not available
      this.logger.log('Signed URL cleanup skipped (Redis not available)');
    } catch (error) {
      this.logger.error('Error cleaning up expired signed URLs:', error);
    }
  }

  // Recommendation cache refresh - runs every 2 hours
  @Cron(CronExpression.EVERY_2_HOURS)
  async refreshRecommendationCache() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting recommendation cache refresh');
      
      // No-op for MVP - Redis not available
      this.logger.log('Recommendation cache refresh skipped (Redis not available)');
    } catch (error) {
      this.logger.error('Error refreshing recommendation cache:', error);
    }
  }

  // Analytics aggregation - runs every hour
  @Cron(CronExpression.EVERY_HOUR)
  async aggregateAnalytics() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting analytics aggregation');
      
      // Aggregate property views
      const oneHourAgo = new Date();
      oneHourAgo.setHours(oneHourAgo.getHours() - 1);

      const propertyViews = await this.prisma.propertyView.count({
        where: {
          createdAt: {
            gte: oneHourAgo,
          },
        },
      });

      this.logger.log(`Aggregated analytics: ${propertyViews} property views in the last hour`);
    } catch (error) {
      this.logger.error('Error aggregating analytics:', error);
    }
  }

  // Property view count update - runs daily at 2 AM
  @Cron('0 2 * * *')
  async updatePropertyViewCounts() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting property view count update');
      
      // Get all properties and update their view counts from PropertyView table
      const properties = await this.prisma.property.findMany({
        select: {
          id: true,
        },
      });

      for (const property of properties) {
        const viewCount = await this.prisma.propertyView.count({
          where: { propertyId: property.id },
        });
        
        await this.prisma.property.update({
          where: { id: property.id },
          data: { views: viewCount },
        });
      }

      this.logger.log(`Updated view counts for ${properties.length} properties`);
    } catch (error) {
      this.logger.error('Error updating property view counts:', error);
    }
  }

  // Soft-delete cleanup - runs weekly on Sunday at 5 AM
  @Cron('0 5 * * 0')
  async cleanupSoftDeletedRecords() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting soft-delete cleanup');
      
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

      // Clean up soft-deleted properties
      const deletedProperties = await this.prisma.property.deleteMany({
        where: {
          deletedAt: {
            lt: ninetyDaysAgo,
          },
          AND: [{ deletedAt: { not: null } }],
        },
      });

      // Clean up soft-deleted users
      const deletedUsers = await this.prisma.user.deleteMany({
        where: {
          deletedAt: {
            lt: ninetyDaysAgo,
          },
          AND: [{ deletedAt: { not: null } }],
        },
      });

      this.logger.log(`Cleaned up ${deletedProperties.count} properties and ${deletedUsers.count} users`);
    } catch (error) {
      this.logger.error('Error cleaning up soft-deleted records:', error);
    }
  }

  // Audit log archival - runs monthly on the 1st at 6 AM
  @Cron('0 6 1 * *')
  async archiveAuditLogs() {
    if (!this.schedulerEnabled) return;

    try {
      this.logger.log('Starting audit log archival');
      
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const oldAuditLogs = await this.prisma.auditLog.deleteMany({
        where: {
          createdAt: {
            lt: sixMonthsAgo,
          },
        },
      });

      this.logger.log(`Archived ${oldAuditLogs.count} audit logs`);
    } catch (error) {
      this.logger.error('Error archiving audit logs:', error);
    }
  }

  // Health check for scheduler - runs every 5 minutes
  @Cron(CronExpression.EVERY_5_MINUTES)
  async schedulerHealthCheck() {
    if (!this.schedulerEnabled) return;

    try {
      const jobs = this.schedulerRegistry.getCronJobs();
      const jobNames = Object.keys(jobs);
      this.logger.debug(`Scheduler health check: ${jobNames.length} active jobs`);
    } catch (error) {
      this.logger.error('Scheduler health check failed:', error);
    }
  }
}

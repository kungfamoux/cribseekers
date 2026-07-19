import { Injectable, Logger } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import * as os from 'os';

@Injectable()
export class SystemHealthIndicator extends HealthIndicator {
  private readonly logger = new Logger(SystemHealthIndicator.name);
  private readonly startTime = Date.now();

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const uptime = Date.now() - this.startTime;
      const memoryUsage = process.memoryUsage();
      const cpuUsage = this.getCpuUsage();
      const diskUsage = await this.getDiskUsage();

      const memoryPercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
      const isMemoryHealthy = memoryPercent < 90;
      const isCpuHealthy = cpuUsage < 80;
      const isDiskHealthy = diskUsage.percent < 90;

      const isHealthy = isMemoryHealthy && isCpuHealthy && isDiskHealthy;

      return this.getStatus(key, isHealthy, {
        uptime: {
          seconds: Math.floor(uptime / 1000),
          human: this.formatUptime(uptime),
        },
        memory: {
          heapUsed: this.formatBytes(memoryUsage.heapUsed),
          heapTotal: this.formatBytes(memoryUsage.heapTotal),
          rss: this.formatBytes(memoryUsage.rss),
          external: this.formatBytes(memoryUsage.external),
          percent: memoryPercent.toFixed(2),
          status: isMemoryHealthy ? 'healthy' : 'warning',
        },
        cpu: {
          usage: cpuUsage.toFixed(2),
          cores: os.cpus().length,
          status: isCpuHealthy ? 'healthy' : 'warning',
        },
        disk: {
          used: this.formatBytes(diskUsage.used),
          total: this.formatBytes(diskUsage.total),
          percent: diskUsage.percent.toFixed(2),
          status: isDiskHealthy ? 'healthy' : 'warning',
        },
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
      });
    } catch (error) {
      this.logger.error('System health check failed:', error);
      return this.getStatus(key, false, {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  private getCpuUsage(): number {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach((cpu) => {
      for (const type in cpu.times) {
        totalTick += (cpu.times as any)[type];
      }
      totalIdle += cpu.times.idle;
    });

    return ((totalTick - totalIdle) / totalTick) * 100;
  }

  private async getDiskUsage(): Promise<{ used: number; total: number; percent: number }> {
    try {
      // This is a simplified implementation
      // In production, you'd use a library like 'diskusage'
      const stats = await this.getDiskStats();
      return stats;
    } catch (error) {
      return { used: 0, total: 0, percent: 0 };
    }
  }

  private async getDiskStats(): Promise<{ used: number; total: number; percent: number }> {
    // Placeholder implementation - in production use actual disk stats
    return { used: 0, total: 0, percent: 0 };
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  private formatUptime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ${hours % 24}h ${minutes % 60}m`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  }
}

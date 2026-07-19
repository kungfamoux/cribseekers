import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import Redis, { Cluster } from 'ioredis';
import { ConfigService } from '../config/config.service';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | Cluster;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    try {
      // Check if already connected
      if (this.client && this.isConnected) {
        this.logger.log('Redis already connected, skipping connection');
        return;
      }

      this.client = new Redis({
        host: this.configService.redisHost,
        port: this.configService.redisPort,
        password: this.configService.redisPassword || undefined,
        db: 0,
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          this.logger.warn(`Redis reconnect attempt ${times}, delay: ${delay}ms`);
          if (times > this.maxReconnectAttempts) {
            this.logger.error('Max reconnection attempts reached');
            return null;
          }
          return delay;
        },
        enableReadyCheck: true,
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        keepAlive: 30000,
        connectTimeout: 10000,
        family: 4,
      });

      this.client.on('connect', () => {
        this.logger.log('Redis connected successfully');
        this.isConnected = true;
        this.reconnectAttempts = 0;
      });

      this.client.on('ready', () => {
        this.logger.log('Redis ready');
        this.isConnected = true;
      });

      this.client.on('error', (error) => {
        this.logger.error('Redis error:', error);
        this.isConnected = false;
      });

      this.client.on('close', () => {
        this.logger.warn('Redis connection closed');
        this.isConnected = false;
      });

      this.client.on('reconnecting', () => {
        this.reconnectAttempts++;
        this.logger.warn(`Redis reconnecting (attempt ${this.reconnectAttempts})`);
      });

      await this.client.connect();
    } catch (error) {
      this.logger.error('Failed to connect to Redis:', error);
      throw error;
    }
  }

  private async disconnect() {
    try {
      if (this.client) {
        await this.client.quit();
        this.logger.log('Redis disconnected successfully');
      }
    } catch (error) {
      this.logger.error('Error disconnecting Redis:', error);
    }
  }

  getClient(): Redis {
    if (!this.isConnected) {
      throw new Error('Redis is not connected');
    }
    return this.client as Redis;
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.client) {
        return false;
      }
      const result = await this.client.ping();
      return result === 'PONG';
    } catch (error) {
      this.logger.error('Redis health check failed:', error);
      return false;
    }
  }

  async getConnectionInfo(): Promise<any> {
    try {
      const info = await this.client.info('server');
      const clients = await this.client.info('clients');
      const memory = await this.client.info('memory');
      const stats = await this.client.info('stats');

      return {
        connected: this.isConnected,
        server: this.parseRedisInfo(info),
        clients: this.parseRedisInfo(clients),
        memory: this.parseRedisInfo(memory),
        stats: this.parseRedisInfo(stats),
      };
    } catch (error) {
      this.logger.error('Failed to get Redis connection info:', error);
      return { connected: false, error: error instanceof Error ? error.message : String(error) };
    }
  }

  private parseRedisInfo(info: string): Record<string, string> {
    const lines = info.split('\r\n');
    const result: Record<string, string> = {};
    for (const line of lines) {
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split(':');
        if (key && value) {
          result[key] = value;
        }
      }
    }
    return result;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await this.client.setex(key, ttl, value);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      this.logger.error(`Redis set error for key ${key}:`, error);
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error(`Redis get error for key ${key}:`, error);
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.error(`Redis del error for key ${key}:`, error);
      throw error;
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      this.logger.error(`Redis exists error for key ${key}:`, error);
      throw error;
    }
  }

  async expire(key: string, ttl: number): Promise<void> {
    try {
      await this.client.expire(key, ttl);
    } catch (error) {
      this.logger.error(`Redis expire error for key ${key}:`, error);
      throw error;
    }
  }

  async ttl(key: string): Promise<number> {
    try {
      return await this.client.ttl(key);
    } catch (error) {
      this.logger.error(`Redis ttl error for key ${key}:`, error);
      throw error;
    }
  }

  async keys(pattern: string): Promise<string[]> {
    try {
      return await this.client.keys(pattern);
    } catch (error) {
      this.logger.error(`Redis keys error for pattern ${pattern}:`, error);
      throw error;
    }
  }

  async mget(keys: string[]): Promise<(string | null)[]> {
    try {
      return await this.client.mget(...keys);
    } catch (error) {
      this.logger.error('Redis mget error:', error);
      throw error;
    }
  }

  async mset(keyValuePairs: Record<string, string>): Promise<void> {
    try {
      const flatPairs = Object.entries(keyValuePairs).flat();
      await this.client.mset(...flatPairs);
    } catch (error) {
      this.logger.error('Redis mset error:', error);
      throw error;
    }
  }

  async incr(key: string): Promise<number> {
    try {
      return await this.client.incr(key);
    } catch (error) {
      this.logger.error(`Redis incr error for key ${key}:`, error);
      throw error;
    }
  }

  async incrby(key: string, value: number): Promise<number> {
    try {
      return await this.client.incrby(key, value);
    } catch (error) {
      this.logger.error(`Redis incrby error for key ${key}:`, error);
      throw error;
    }
  }

  async decr(key: string): Promise<number> {
    try {
      return await this.client.decr(key);
    } catch (error) {
      this.logger.error(`Redis decr error for key ${key}:`, error);
      throw error;
    }
  }

  async decrby(key: string, value: number): Promise<number> {
    try {
      return await this.client.decrby(key, value);
    } catch (error) {
      this.logger.error(`Redis decrby error for key ${key}:`, error);
      throw error;
    }
  }

  async hset(key: string, field: string, value: string): Promise<number> {
    try {
      return await this.client.hset(key, field, value);
    } catch (error) {
      this.logger.error(`Redis hset error for key ${key}:`, error);
      throw error;
    }
  }

  async hget(key: string, field: string): Promise<string | null> {
    try {
      return await this.client.hget(key, field);
    } catch (error) {
      this.logger.error(`Redis hget error for key ${key}:`, error);
      throw error;
    }
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    try {
      return await this.client.hgetall(key);
    } catch (error) {
      this.logger.error(`Redis hgetall error for key ${key}:`, error);
      throw error;
    }
  }

  async hdel(key: string, ...fields: string[]): Promise<number> {
    try {
      return await this.client.hdel(key, ...fields);
    } catch (error) {
      this.logger.error(`Redis hdel error for key ${key}:`, error);
      throw error;
    }
  }

  async lpush(key: string, ...values: string[]): Promise<number> {
    try {
      return await this.client.lpush(key, ...values);
    } catch (error) {
      this.logger.error(`Redis lpush error for key ${key}:`, error);
      throw error;
    }
  }

  async rpush(key: string, ...values: string[]): Promise<number> {
    try {
      return await this.client.rpush(key, ...values);
    } catch (error) {
      this.logger.error(`Redis rpush error for key ${key}:`, error);
      throw error;
    }
  }

  async lrange(key: string, start: number, stop: number): Promise<string[]> {
    try {
      return await this.client.lrange(key, start, stop);
    } catch (error) {
      this.logger.error(`Redis lrange error for key ${key}:`, error);
      throw error;
    }
  }

  async llen(key: string): Promise<number> {
    try {
      return await this.client.llen(key);
    } catch (error) {
      this.logger.error(`Redis llen error for key ${key}:`, error);
      throw error;
    }
  }

  async sadd(key: string, ...members: string[]): Promise<number> {
    try {
      return await this.client.sadd(key, ...members);
    } catch (error) {
      this.logger.error(`Redis sadd error for key ${key}:`, error);
      throw error;
    }
  }

  async smembers(key: string): Promise<string[]> {
    try {
      return await this.client.smembers(key);
    } catch (error) {
      this.logger.error(`Redis smembers error for key ${key}:`, error);
      throw error;
    }
  }

  async srem(key: string, ...members: string[]): Promise<number> {
    try {
      return await this.client.srem(key, ...members);
    } catch (error) {
      this.logger.error(`Redis srem error for key ${key}:`, error);
      throw error;
    }
  }

  async zadd(key: string, score: number, member: string): Promise<number> {
    try {
      return await this.client.zadd(key, score, member);
    } catch (error) {
      this.logger.error(`Redis zadd error for key ${key}:`, error);
      throw error;
    }
  }

  async zrange(key: string, start: number, stop: number): Promise<string[]> {
    try {
      return await this.client.zrange(key, start, stop);
    } catch (error) {
      this.logger.error(`Redis zrange error for key ${key}:`, error);
      throw error;
    }
  }

  async zrem(key: string, ...members: string[]): Promise<number> {
    try {
      return await this.client.zrem(key, ...members);
    } catch (error) {
      this.logger.error(`Redis zrem error for key ${key}:`, error);
      throw error;
    }
  }

  async flushdb(): Promise<void> {
    try {
      await this.client.flushdb();
      this.logger.warn('Redis database flushed');
    } catch (error) {
      this.logger.error('Redis flushdb error:', error);
      throw error;
    }
  }

  async flushall(): Promise<void> {
    try {
      await this.client.flushall();
      this.logger.warn('All Redis databases flushed');
    } catch (error) {
      this.logger.error('Redis flushall error:', error);
      throw error;
    }
  }

  async dbsize(): Promise<number> {
    try {
      return await this.client.dbsize();
    } catch (error) {
      this.logger.error('Redis dbsize error:', error);
      throw error;
    }
  }

  async info(section?: string): Promise<string> {
    try {
      return section ? await this.client.info(section) : await this.client.info();
    } catch (error) {
      this.logger.error('Redis info error:', error);
      throw error;
    }
  }
}

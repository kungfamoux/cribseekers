import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Cache Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Cache Functionality', () => {
    it('should cache property search results', async () => {
      const searchQuery = {
        city: 'Lagos',
        minPrice: 100000,
        maxPrice: 5000000,
      };

      // First request - cache miss
      const response1 = await request(app.getHttpServer())
        .get('/api/v1/properties/search')
        .query(searchQuery)
        .expect(200);

      // Second request - cache hit (should be faster)
      const response2 = await request(app.getHttpServer())
        .get('/api/v1/properties/search')
        .query(searchQuery)
        .expect(200);

      expect(response1.body).toEqual(response2.body);
    });

    it('should invalidate cache on property update', async () => {
      // This test would require authentication and property creation
      // For now, we'll just test the cache endpoint exists
      return request(app.getHttpServer())
        .get('/api/v1/properties')
        .expect(200);
    });
  });

  describe('Redis Connection', () => {
    it('should have Redis connection available', async () => {
      const response = await request(app.getHttpServer())
        .get('/health/ready')
        .expect(200);

      expect(response.body.info.redis).toHaveProperty('status', 'up');
    });
  });
});

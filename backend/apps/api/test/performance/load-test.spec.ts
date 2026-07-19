import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('Performance Load Tests', () => {
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

  describe('API Performance', () => {
    it('should handle 100 concurrent requests', async () => {
      const requests = Array(100).fill(null).map(() =>
        request(app.getHttpServer())
          .get('/api/v1/properties')
          .expect(200)
      );

      const startTime = Date.now();
      await Promise.all(requests);
      const duration = Date.now() - startTime;

      // Should complete within 10 seconds
      expect(duration).toBeLessThan(10000);
    });

    it('should maintain response time under load', async () => {
      const responseTimes = [];

      for (let i = 0; i < 50; i++) {
        const start = Date.now();
        await request(app.getHttpServer())
          .get('/api/v1/properties')
          .expect(200);
        responseTimes.push(Date.now() - start);
      }

      const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const maxResponseTime = Math.max(...responseTimes);

      // Average should be under 500ms
      expect(avgResponseTime).toBeLessThan(500);
      // Max should be under 2000ms
      expect(maxResponseTime).toBeLessThan(2000);
    });

    it('should handle sequential requests efficiently', async () => {
      const responseTimes = [];

      for (let i = 0; i < 20; i++) {
        const start = Date.now();
        await request(app.getHttpServer())
          .get('/api/v1/properties')
          .expect(200);
        responseTimes.push(Date.now() - start);
      }

      const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      expect(avgResponseTime).toBeLessThan(200);
    });
  });

  describe('Memory Performance', () => {
    it('should not leak memory under load', async () => {
      const initialMemory = process.memoryUsage().heapUsed;

      // Make 1000 requests
      for (let i = 0; i < 1000; i++) {
        await request(app.getHttpServer())
          .get('/api/v1/properties')
          .expect(200);
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (< 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });
  });
});

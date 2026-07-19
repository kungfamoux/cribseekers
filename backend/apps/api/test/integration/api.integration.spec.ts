import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('API Integration Tests', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Setup: Create test user and get auth token
    const registerResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'StrongPassword123!',
        firstName: 'Test',
        lastName: 'User',
      });

    if (registerResponse.status === 201) {
      const loginResponse = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: 'StrongPassword123!',
        });

      if (loginResponse.status === 200) {
        authToken = loginResponse.body.accessToken;
      }
    }
  });

  afterAll(async () => {
    // Cleanup: Delete test user
    await request(app.getHttpServer())
      .delete('/api/v1/users/me')
      .set('Authorization', `Bearer ${authToken}`);

    await app.close();
  });

  describe('Authentication Endpoints', () => {
    describe('POST /api/v1/auth/register', () => {
      it('should register a new user', () => {
        return request(app.getHttpServer())
          .post('/api/v1/auth/register')
          .send({
            email: `test${Date.now()}@example.com`,
            password: 'StrongPassword123!',
            firstName: 'Test',
            lastName: 'User',
          })
          .expect(201)
          .expect((res) => {
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('email');
            expect(res.body).toHaveProperty('accessToken');
            expect(res.body).toHaveProperty('refreshToken');
          });
      });

      it('should fail with weak password', () => {
        return request(app.getHttpServer())
          .post('/api/v1/auth/register')
          .send({
            email: `test${Date.now()}@example.com`,
            password: 'weak',
            firstName: 'Test',
            lastName: 'User',
          })
          .expect(400);
      });

      it('should fail with duplicate email', () => {
        return request(app.getHttpServer())
          .post('/api/v1/auth/register')
          .send({
            email: 'test@example.com',
            password: 'StrongPassword123!',
            firstName: 'Test',
            lastName: 'User',
          })
          .expect(409);
      });
    });

    describe('POST /api/v1/auth/login', () => {
      it('should login with valid credentials', () => {
        return request(app.getHttpServer())
          .post('/api/v1/auth/login')
          .send({
            email: 'test@example.com',
            password: 'StrongPassword123!',
          })
          .expect(200)
          .expect((res) => {
            expect(res.body).toHaveProperty('accessToken');
            expect(res.body).toHaveProperty('refreshToken');
            expect(res.body).toHaveProperty('user');
          });
      });

      it('should fail with invalid credentials', () => {
        return request(app.getHttpServer())
          .post('/api/v1/auth/login')
          .send({
            email: 'test@example.com',
            password: 'WrongPassword123!',
          })
          .expect(401);
      });
    });
  });

  describe('Protected Endpoints', () => {
    it('should require authentication', () => {
      return request(app.getHttpServer())
        .get('/api/v1/users/me')
        .expect(401);
    });

    it('should accept valid token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('should reject invalid token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/users/me')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      const requests = Array(101).fill(null).map(() =>
        request(app.getHttpServer())
          .get('/api/v1/properties')
      );

      const responses = await Promise.all(requests);
      const rateLimitedResponses = responses.filter(r => r.status === 429);

      expect(rateLimitedResponses.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('should return RFC7807 Problem Details for errors', () => {
      return request(app.getHttpServer())
        .get('/api/v1/properties/invalid-id')
        .expect(400)
        .expect((res) => {
          expect(res.body).toHaveProperty('type');
          expect(res.body).toHaveProperty('title');
          expect(res.body).toHaveProperty('status');
          expect(res.body).toHaveProperty('detail');
          expect(res.body).toHaveProperty('instance');
          expect(res.body).toHaveProperty('correlationId');
        });
    });
  });
});

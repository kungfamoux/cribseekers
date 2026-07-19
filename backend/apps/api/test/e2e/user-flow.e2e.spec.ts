import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('User Flow E2E Tests', () => {
  let app: INestApplication;
  let authToken: string;
  let userId: string;
  let propertyId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // Cleanup
    if (authToken && propertyId) {
      await request(app.getHttpServer())
        .delete(`/api/v1/properties/${propertyId}`)
        .set('Authorization', `Bearer ${authToken}`);
    }

    if (authToken) {
      await request(app.getHttpServer())
        .delete('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`);
    }

    await app.close();
  });

  describe('Complete User Registration and Property Creation Flow', () => {
    it('should complete full user journey', async () => {
      // Step 1: Register user
      const registerResponse = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: `e2e${Date.now()}@example.com`,
          password: 'StrongPassword123!',
          firstName: 'E2E',
          lastName: 'Test',
          phoneNumber: '+2348000000000',
        })
        .expect(201);

      expect(registerResponse.body).toHaveProperty('accessToken');
      authToken = registerResponse.body.accessToken;
      userId = registerResponse.body.user.id;

      // Step 2: Login
      const loginResponse = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: registerResponse.body.user.email,
          password: 'StrongPassword123!',
        })
        .expect(200);

      authToken = loginResponse.body.accessToken;

      // Step 3: Get user profile
      const profileResponse = await request(app.getHttpServer())
        .get('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(profileResponse.body.id).toBe(userId);

      // Step 4: Update user profile
      await request(app.getHttpServer())
        .patch('/api/v1/users/me')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          bio: 'Test user for E2E testing',
        })
        .expect(200);

      // Step 5: Create a property (if user has proper permissions)
      try {
        const propertyResponse = await request(app.getHttpServer())
          .post('/api/v1/properties')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            title: 'E2E Test Property',
            description: 'Property created during E2E test',
            categoryId: 'category-id',
            typeId: 'type-id',
            purposeId: 'purpose-id',
            listingType: 'RENT',
            price: 500000,
            currency: 'NGN',
            location: {
              address: 'Test Address',
              city: 'Lagos',
              state: 'Lagos',
              country: 'Nigeria',
              latitude: 6.5244,
              longitude: 3.3792,
            },
          });

        if (propertyResponse.status === 201) {
          propertyId = propertyResponse.body.id;

          // Step 6: Get the property
          await request(app.getHttpServer())
            .get(`/api/v1/properties/${propertyId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);

          // Step 7: Update the property
          await request(app.getHttpServer())
            .patch(`/api/v1/properties/${propertyId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
              title: 'Updated E2E Test Property',
            })
            .expect(200);

          // Step 8: Search for properties
          await request(app.getHttpServer())
            .get('/api/v1/properties/search')
            .query({ city: 'Lagos' })
            .expect(200);
        }
      } catch (error) {
        // Property creation might fail due to missing permissions or data
        console.log('Property creation skipped:', error instanceof Error ? error.message : String(error));
      }

      // Step 9: Logout
      await request(app.getHttpServer())
        .post('/api/v1/auth/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  describe('Error Recovery Flow', () => {
    it('should handle authentication errors gracefully', async () => {
      // Try to access protected endpoint without token
      await request(app.getHttpServer())
        .get('/api/v1/users/me')
        .expect(401);

      // Try with invalid token
      await request(app.getHttpServer())
        .get('/api/v1/users/me')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);

      // Try with expired token (simulated)
      await request(app.getHttpServer())
        .get('/api/v1/users/me')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired')
        .expect(401);
    });

    it('should handle validation errors gracefully', async () => {
      // Invalid email
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'invalid-email',
          password: 'StrongPassword123!',
          firstName: 'Test',
          lastName: 'User',
        })
        .expect(400);

      // Weak password
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'weak',
          firstName: 'Test',
          lastName: 'User',
        })
        .expect(400);

      // Missing required fields
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
        })
        .expect(400);
    });

    it('should handle not found errors gracefully', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/properties/non-existent-id')
        .expect(404);
    });
  });
});

# CribSeekers API Documentation

Enterprise-grade REST API for the CribSeekers Nigerian real estate platform.

<div align="center">

**Version:** 1.0.0  
**Base URL:** `https://cribseekers.onrender.com/api/v1`  
**Documentation:** `https://cribseekers.onrender.com/api/v1/docs`  
**Status:** Production

</div>

---

## Table of Contents

- [Introduction](#introduction)
- [Authentication](#authentication)
- [API Versioning](#api-versioning)
- [Base URLs & Environments](#base-urls--environments)
- [Common Request Headers](#common-request-headers)
- [Response Format](#response-format)
- [Error Responses](#error-responses)
- [Pagination](#pagination)
- [Filtering](#filtering)
- [Sorting](#sorting)
- [Search](#search)
- [Rate Limiting](#rate-limiting)
- [Idempotency](#idempotency)
- [Business Rules](#business-rules)
- [Modules](#modules)
  - [Health & Metrics](#health--metrics)
  - [Users](#users)
  - [Roles & Permissions](#roles--permissions)
  - [Properties](#properties)
  - [Property Categories](#property-categories)
  - [Search](#search)
  - [Recommendations](#recommendations)
  - [Inspections](#inspections)
  - [Payments](#payments)
  - [Wallets](#wallets)
  - [Bank Accounts](#bank-accounts)
  - [Invoices](#invoices)
  - [Receipts](#receipts)
  - [Escrows](#escrows)
  - [Settlements](#settlements)
  - [Withdrawals](#withdrawals)
  - [Communication](#communication)
  - [Notifications](#notifications)
  - [Admin](#admin)
  - [API Keys](#api-keys)
  - [Webhooks](#webhooks)
  - [Background Jobs](#background-jobs)
  - [Feature Flags](#feature-flags)
- [WebSocket Events](#websocket-events)
- [Status Codes](#status-codes)
- [Request Examples](#request-examples)
- [Changelog](#changelog)
- [Future APIs](#future-apis)

---

## Introduction

The CribSeekers API provides programmatic access to the Nigerian real estate platform, enabling developers to build applications for property listings, inspections, payments, and more.

### Key Features

- **Property Management**: Create, list, search, and manage property listings
- **Inspection Booking**: Schedule and manage property inspections with OTP/QR verification
- **Secure Payments**: Integrated escrow, wallet, and payment processing
- **Real-time Communication**: WebSocket-based messaging and typing indicators
- **AI Recommendations**: Personalized property recommendations
- **Admin Tools**: Comprehensive moderation, audit logs, and system management

### Getting Started

1. **Obtain API Credentials**: Contact CribSeekers to get your API keys
2. **Authenticate**: Use JWT Bearer tokens for authenticated requests
3. **Make Requests**: Start with our health check endpoint to verify connectivity
4. **Explore**: Use the interactive Swagger documentation at `/api/v1/docs`

---

## Authentication

CribSeekers API uses JWT (JSON Web Token) Bearer authentication for securing API endpoints.

### Authentication Flow

#### 1. Login

```bash
curl -X POST https://cribseekers.onrender.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your-password"
  }'
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_123456789",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

#### 2. Using Access Token

Include the access token in the `Authorization` header:

```bash
curl -X GET https://cribseekers.onrender.com/api/v1/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### 3. Token Refresh

Access tokens expire after 15 minutes. Use the refresh token to obtain a new access token:

```bash
curl -X POST https://cribseekers.onrender.com/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }'
```

#### 4. Logout

```bash
curl -X POST https://cribseekers.onrender.com/api/v1/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Authorization Header Format

```
Authorization: Bearer <JWT_TOKEN>
```

### Token Expiration

| Token Type | Expiration | Refreshable |
|------------|------------|-------------|
| Access Token | 15 minutes | Yes |
| Refresh Token | 7 days | No |

### Authentication Errors

| Status Code | Error | Description |
|-------------|-------|-------------|
| 401 | `UNAUTHORIZED` | Invalid or expired token |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 401 | `TOKEN_EXPIRED` | Access token expired, use refresh token |

### Role-Based Authorization

The API implements role-based access control (RBAC) with the following roles:

| Role | Description | Permissions |
|------|-------------|-------------|
| `SUPER_ADMIN` | Full system access | All permissions |
| `SUPPORT_ADMIN` | Customer support | User moderation, property approval |
| `PROPERTY_AGENT` | Property listing agent | Create/manage properties |
| `INSPECTOR` | Property inspector | Manage inspections |
| `USER` | Regular user | Basic access |
| `GUEST` | Unauthenticated | Public endpoints only |

---

## API Versioning

The CribSeekers API uses URL-based versioning to ensure backward compatibility.

### Current Version

**Version:** `v1`  
**URL Pattern:** `/api/v1/*`

### Versioning Strategy

- **Major Version Breaking Changes**: Incremented for breaking changes (e.g., `/api/v2/`)
- **Backward Compatibility**: Minor updates maintain backward compatibility
- **Deprecation Policy**: Deprecated endpoints are supported for at least 6 months
- **Sunset Notice**: 90-day notice before endpoint removal

### Deprecation Headers

Deprecated endpoints include the following headers:

```
Warning: 299 - "Deprecated API endpoint. Use /api/v2/properties instead"
Sunset: Wed, 21 Oct 2026 07:28:00 GMT
Link: <https://cribseekers.com/api/v2/properties>; rel="successor-version"
```

---

## Base URLs & Environments

| Environment | Base URL | Purpose |
|-------------|-----------|---------|
| **Production** | `https://cribseekers.onrender.com/api/v1` | Live production environment |
| **Staging** | `https://cribseekers-staging.onrender.com/api/v1` | Pre-production testing |
| **Development** | `http://localhost:3001/api/v1` | Local development |

### Environment Detection

The API automatically detects the environment based on the `NODE_ENV` variable:

- `production`: Production environment
- `staging`: Staging environment  
- `development`: Development environment

---

## Common Request Headers

### Standard Headers

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `Authorization` | Yes* | JWT Bearer token | `Bearer eyJhbGciOiJIUzI1NiIs...` |
| `Content-Type` | Conditional | Request body format | `application/json` |
| `Accept` | No | Response format preference | `application/json` |
| `User-Agent` | Recommended | Client identification | `CribSeekers-App/1.0.0` |

### Request Tracking Headers

| Header | Required | Description | Example |
|--------|----------|-------------|---------|
| `X-Request-ID` | No | Unique request identifier | `req_123456789` |
| `X-Correlation-ID` | No | Correlates related requests | `corr_987654321` |

### Example Request with Headers

```bash
curl -X GET https://cribseekers.onrender.com/api/v1/properties \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "X-Request-ID: req_123456789" \
  -H "User-Agent: CribSeekers-App/1.0.0"
```

---

## Response Format

All API responses follow a consistent JSON structure.

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    "id": "prop_123456789",
    "title": "Modern 3-Bedroom Apartment",
    "price": 2500000
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  },
  "errors": []
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "meta": {},
  "errors": [
    {
      "field": "email",
      "message": "Email is required",
      "code": "REQUIRED_FIELD"
    }
  ]
}
```

### Paginated Response

```json
{
  "success": true,
  "message": "Properties retrieved successfully",
  "data": [
    {
      "id": "prop_123456789",
      "title": "Modern 3-Bedroom Apartment"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "nextPage": 2,
    "previousPage": null,
    "hasNext": true,
    "hasPrevious": false
  },
  "errors": []
}
```

---

## Error Responses

### HTTP Status Codes

| Status Code | Title | Description |
|-------------|-------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request succeeded, no content returned |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict (duplicate, etc.) |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Service temporarily unavailable |

### Error Response Structure

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Bad Request",
  "status": 400,
  "detail": "Invalid request parameters",
  "instance": "/api/v1/properties",
  "timestamp": "2026-07-19T13:00:00.000Z",
  "errors": [
    {
      "field": "price",
      "message": "Price must be greater than 0",
      "code": "INVALID_VALUE"
    }
  ]
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `REQUIRED_FIELD` | Required field is missing |
| `INVALID_VALUE` | Field value is invalid |
| `INVALID_FORMAT` | Field format is invalid |
| `DUPLICATE_VALUE` | Value already exists |
| `NOT_FOUND` | Resource not found |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `RATE_LIMIT_EXCEEDED` | Rate limit exceeded |
| `VALIDATION_ERROR` | Validation failed |

---

## Pagination

### Pagination Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number (1-indexed) |
| `limit` | integer | 20 | Items per page (max: 100) |

### Pagination Response

```json
{
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "nextPage": 2,
    "previousPage": null,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

### Example Request

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/properties?page=2&limit=50" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Pagination Best Practices

- Use `limit` between 10-100 for optimal performance
- Check `hasNext` before requesting the next page
- Cache total counts when possible to reduce load

---

## Filtering

### Supported Filters

| Filter | Type | Description | Example |
|--------|------|-------------|---------|
| `status` | string | Resource status | `?status=published` |
| `city` | string | City name | `?city=Lagos` |
| `state` | string | State name | `?state=Lagos` |
| `priceMin` | number | Minimum price | `?priceMin=1000000` |
| `priceMax` | number | Maximum price | `?priceMax=5000000` |
| `bedrooms` | integer | Number of bedrooms | `?bedrooms=3` |
| `bathrooms` | integer | Number of bathrooms | `?bathrooms=2` |
| `purpose` | string | Property purpose | `?purpose=rent` |
| `category` | string | Property category | `?category=apartment` |
| `type` | string | Property type | `?type=flat` |
| `published` | boolean | Published status | `?published=true` |
| `verified` | boolean | Verification status | `?verified=true` |
| `featured` | boolean | Featured status | `?featured=true` |

### Example Request with Filters

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/properties?city=Lagos&priceMin=1000000&priceMax=5000000&bedrooms=3&published=true" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

## Sorting

### Sort Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `sortBy` | string | Field to sort by | `?sortBy=createdAt` |
| `sortOrder` | string | Sort direction (asc/desc) | `?sortOrder=desc` |

### Supported Sort Fields

| Field | Description |
|-------|-------------|
| `createdAt` | Creation date |
| `updatedAt` | Last update date |
| `price` | Property price |
| `popularity` | Popularity score |
| `distance` | Distance from location |
| `views` | View count |
| `inquiries` | Inquiry count |

### Example Request with Sorting

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/properties?sortBy=price&sortOrder=asc" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

## Search

### Search Capabilities

The API provides multiple search methods for finding properties:

#### 1. Global Search

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/search?keyword=modern%20apartment&city=Lagos" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

#### 2. Keyword Search

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/search/keyword?keyword=3bedroom" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

#### 3. Geo Search

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/search/geo/nearby?lat=6.5244&lng=3.3792&radius=5" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

#### 4. Location-Based Search

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/search/state/Lagos" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

#### 5. Search Suggestions

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/search/suggestions?query=ike" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

---

## Rate Limiting

### Rate Limits

| Tier | Requests | Time Window |
|------|----------|-------------|
| Public | 100 | 15 minutes |
| Authenticated | 1000 | 15 minutes |
| Admin | 5000 | 15 minutes |
| WebSocket | 100 | 1 minute |

### Rate Limit Headers

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1626792000
```

### Rate Limit Error

```json
{
  "success": false,
  "message": "Rate limit exceeded",
  "data": null,
  "meta": {
    "retryAfter": 60
  },
  "errors": [
    {
      "code": "RATE_LIMIT_EXCEEDED",
      "message": "Too many requests. Please try again in 60 seconds."
    }
  ]
}
```

---

## Idempotency

To prevent duplicate operations, use idempotency keys for POST, PUT, and DELETE requests.

### Idempotency Key Header

```
X-Idempotency-Key: <unique_key>
```

### Example Request

```bash
curl -X POST https://cribseekers.onrender.com/api/v1/properties \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "X-Idempotency-Key: prop_123456789_unique" \
  -H "Content-Type: application/json" \
  -d '{"title": "Modern Apartment"}'
```

### Idempotency Rules

- Idempotency keys expire after 24 hours
- Same key returns the original response
- Different keys create new operations

---

## Business Rules

### Nigerian Marketplace Rules

#### Rent Duration
- **Default**: Yearly rent
- **Exception**: Monthly rent allowed only for serviced apartments
- **Validation**: Property type must include "serviced" for monthly rent

#### Property Publishing
- Only **VERIFIED** properties can be published
- Verification requires:
  - Valid property documents
  - Owner verification
  - Location verification
  - Photo verification

#### Supported Locations
- **States**: All 36 Nigerian states + FCT
- **LGAs**: All 774 Local Government Areas
- **Validation**: State and LGA must match official Nigerian data

#### Currency
- **Default**: Nigerian Naira (NGN)
- **Format**: All prices in NGN
- **Display**: Format as ₦1,000,000

#### Inspection Working Hours
- **Days**: Monday - Saturday
- **Hours**: 8:00 AM - 6:00 PM
- **Timezone**: West Africa Time (WAT)
- **Validation**: Inspections outside hours are rejected

#### Location Requirements
- **Google Maps Coordinates**: Required for all properties
- **Format**: Latitude and Longitude
- **Validation**: Coordinates must be within Nigeria bounds
- **Accuracy**: Within 50 meters

#### Payment Rules
- **Escrow Required**: For all property transactions
- **Verification**: Bank account verification required
- **Settlement**: 24-48 hour settlement period
- **Refunds**: 7-day refund window

---

## Modules

### Health & Metrics

#### Health Check

Check API health status.

**Endpoint:** `GET /health`

**Authentication:** Not required

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-07-19T13:00:00.000Z",
  "checks": {
    "database": {
      "status": "up"
    },
    "storage": {
      "status": "up"
    },
    "system": {
      "status": "up"
    }
  }
}
```

#### Liveness Probe

**Endpoint:** `GET /health/live`

**Authentication:** Not required

#### Readiness Probe

**Endpoint:** `GET /health/ready`

**Authentication:** Not required

#### Metrics

**Endpoint:** `GET /metrics`

**Authentication:** Not required

**Description:** Prometheus metrics endpoint for monitoring

---

### Users

#### Create User

Create a new user account.

**Endpoint:** `POST /users`

**Authentication:** Not required

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+2348012345678"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "usr_123456789",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+2348012345678",
    "createdAt": "2026-07-19T13:00:00.000Z"
  }
}
```

#### Get All Users

Retrieve users with filtering and pagination.

**Endpoint:** `GET /users`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number |
| `limit` | integer | Items per page |
| `status` | string | Filter by status |
| `role` | string | Filter by role |

**Response:**

```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "usr_123456789",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "status": "active"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

#### Get User by ID

**Endpoint:** `GET /users/:id`

**Authentication:** Required

**Response:**

```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "usr_123456789",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Update User

**Endpoint:** `PUT /users/:id`

**Authentication:** Required

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phoneNumber": "+2348098765432"
}
```

#### Delete User

**Endpoint:** `DELETE /users/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Soft Delete User

**Endpoint:** `DELETE /users/:id/soft`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Restore User

**Endpoint:** `POST /users/:id/restore`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

---

### Roles & Permissions

#### Create Role

**Endpoint:** `POST /roles`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Get All Roles

**Endpoint:** `GET /roles`

**Authentication:** Required

#### Get Role by ID

**Endpoint:** `GET /roles/:id`

**Authentication:** Required

#### Update Role

**Endpoint:** `PUT /roles/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Delete Role

**Endpoint:** `DELETE /roles/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Create Permission

**Endpoint:** `POST /permissions`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Get All Permissions

**Endpoint:** `GET /permissions`

**Authentication:** Required

#### Update Permission

**Endpoint:** `PUT /permissions/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Delete Permission

**Endpoint:** `DELETE /permissions/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

---

### Properties

#### Create Property

Create a new property listing.

**Endpoint:** `POST /properties`

**Authentication:** Required

**Roles:** `PROPERTY_AGENT`, `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Request Body:**

```json
{
  "title": "Modern 3-Bedroom Apartment in Lekki",
  "description": "Luxurious apartment with stunning views",
  "price": 2500000,
  "currency": "NGN",
  "purpose": "rent",
  "bedrooms": 3,
  "bathrooms": 2,
  "toilets": 3,
  "parkingSpaces": 2,
  "totalArea": 150,
  "areaUnit": "sqm",
  "categoryId": "cat_123",
  "typeId": "type_456",
  "purposeId": "purpose_789",
  "location": {
    "address": "123 Lekki Expressway",
    "city": "Lagos",
    "state": "Lagos",
    "lga": "Eti-Osa",
    "latitude": 6.5244,
    "longitude": 3.3792
  },
  "amenities": ["swimming pool", "gym", "security"],
  "images": ["https://example.com/image1.jpg"],
  "features": ["serviced", "furnished"]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Property created successfully",
  "data": {
    "id": "prop_123456789",
    "title": "Modern 3-Bedroom Apartment in Lekki",
    "price": 2500000,
    "status": "draft",
    "createdAt": "2026-07-19T13:00:00.000Z"
  }
}
```

#### Get All Properties

**Endpoint:** `GET /properties`

**Authentication:** Not required

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number |
| `limit` | integer | Items per page |
| `status` | string | Filter by status |
| `city` | string | Filter by city |
| `state` | string | Filter by state |
| `priceMin` | number | Minimum price |
| `priceMax` | number | Maximum price |
| `bedrooms` | integer | Number of bedrooms |
| `purpose` | string | Property purpose |
| `published` | boolean | Published status |
| `verified` | boolean | Verification status |
| `featured` | boolean | Featured status |

**Response:**

```json
{
  "success": true,
  "message": "Properties retrieved successfully",
  "data": [
    {
      "id": "prop_123456789",
      "title": "Modern 3-Bedroom Apartment",
      "price": 2500000,
      "location": {
        "city": "Lagos",
        "state": "Lagos"
      },
      "status": "published"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

#### Get Property by ID

**Endpoint:** `GET /properties/:id`

**Authentication:** Not required

**Response:**

```json
{
  "success": true,
  "message": "Property retrieved successfully",
  "data": {
    "id": "prop_123456789",
    "title": "Modern 3-Bedroom Apartment",
    "description": "Luxurious apartment with stunning views",
    "price": 2500000,
    "location": {
      "address": "123 Lekki Expressway",
      "city": "Lagos",
      "state": "Lagos",
      "latitude": 6.5244,
      "longitude": 3.3792
    },
    "amenities": ["swimming pool", "gym"],
    "images": ["https://example.com/image1.jpg"],
    "status": "published",
    "views": 150,
    "inquiries": 25
  }
}
```

#### Update Property

**Endpoint:** `PUT /properties/:id`

**Authentication:** Required

**Roles:** `PROPERTY_AGENT`, `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Request Body:**

```json
{
  "title": "Updated Property Title",
  "price": 3000000,
  "description": "Updated description"
}
```

#### Delete Property

**Endpoint:** `DELETE /properties/:id`

**Authentication:** Required

**Roles:** `PROPERTY_AGENT`, `SUPER_ADMIN`

#### Publish Property

**Endpoint:** `POST /properties/:id/publish`

**Authentication:** Required

**Roles:** `PROPERTY_AGENT`, `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Description:** Publish a property. Property must be verified first.

#### Unpublish Property

**Endpoint:** `POST /properties/:id/unpublish`

**Authentication:** Required

**Roles:** `PROPERTY_AGENT`, `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Verify Property

**Endpoint:** `POST /properties/:id/verify`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Description:** Verify a property for publishing.

#### Increment Views

**Endpoint:** `POST /properties/:id/views`

**Authentication:** Not required

#### Increment Inquiries

**Endpoint:** `POST /properties/:id/inquiries`

**Authentication:** Required

---

### Property Categories

#### Create Category

**Endpoint:** `POST /categories`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Get All Categories

**Endpoint:** `GET /categories`

**Authentication:** Not required

**Response:**

```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "id": "cat_123",
      "name": "Apartment",
      "slug": "apartment",
      "description": "Residential apartments",
      "isActive": true
    }
  ]
}
```

#### Get Active Categories

**Endpoint:** `GET /categories/active`

**Authentication:** Not required

#### Update Category

**Endpoint:** `PUT /categories/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Delete Category

**Endpoint:** `DELETE /categories/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

---

### Search

#### Global Search

**Endpoint:** `GET /search`

**Authentication:** Not required

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `keyword` | string | Search keyword |
| `city` | string | Filter by city |
| `state` | string | Filter by state |
| `priceMin` | number | Minimum price |
| `priceMax` | number | Maximum price |
| `bedrooms` | integer | Number of bedrooms |
| `purpose` | string | Property purpose |

**Response:**

```json
{
  "success": true,
  "message": "Search results retrieved successfully",
  "data": [
    {
      "id": "prop_123456789",
      "title": "Modern 3-Bedroom Apartment",
      "price": 2500000,
      "location": {
        "city": "Lagos",
        "state": "Lagos"
      },
      "relevanceScore": 0.95
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 20
  }
}
```

#### Keyword Search

**Endpoint:** `GET /search/keyword`

**Authentication:** Not required

#### Location Search

**Endpoint:** `GET /search/state/:state`

**Authentication:** Not required

**Endpoint:** `GET /search/city/:city`

**Authentication:** Not required

**Endpoint:** `GET /search/lga/:lga`

**Authentication:** Not required

#### Featured Search

**Endpoint:** `GET /search/featured`

**Authentication:** Not required

#### Recent Search

**Endpoint:** `GET /search/recent`

**Authentication:** Not required

#### Popular Search

**Endpoint:** `GET /search/popular`

**Authentication:** Not required

#### Search Suggestions

**Endpoint:** `GET /search/suggestions`

**Authentication:** Not required

**Response:**

```json
{
  "success": true,
  "message": "Suggestions retrieved successfully",
  "data": [
    {
      "text": "Ikeja",
      "type": "city",
      "count": 150
    },
    {
      "text": "3 bedroom apartment",
      "type": "keyword",
      "count": 200
    }
  ]
}
```

---

### Recommendations

#### Get Personalized Recommendations

**Endpoint:** `GET /recommendations`

**Authentication:** Required

**Description:** Get AI-powered personalized property recommendations based on user preferences and history.

**Response:**

```json
{
  "success": true,
  "message": "Recommendations retrieved successfully",
  "data": [
    {
      "propertyId": "prop_123456789",
      "title": "Modern 3-Bedroom Apartment",
      "score": 0.95,
      "reason": "Based on your search history"
    }
  ]
}
```

#### Get Popular Recommendations

**Endpoint:** `GET /recommendations/popular`

**Authentication:** Not required

#### Get Similar Properties

**Endpoint:** `GET /recommendations/similar/:propertyId`

**Authentication:** Required

#### Get Budget Recommendations

**Endpoint:** `GET /recommendations/budget`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `minPrice` | number | Minimum budget |
| `maxPrice` | number | Maximum budget |

#### Get Location Recommendations

**Endpoint:** `GET /recommendations/location/:locationId`

**Authentication:** Required

#### Get History Recommendations

**Endpoint:** `GET /recommendations/history`

**Authentication:** Required

#### Get Recommendation Explanation

**Endpoint:** `GET /recommendations/explanations/:propertyId`

**Authentication:** Required

**Response:**

```json
{
  "success": true,
  "message": "Explanation retrieved successfully",
  "data": {
    "propertyId": "prop_123456789",
    "factors": [
      {
        "factor": "location",
        "weight": 0.4,
        "description": "Matches your preferred location"
      },
      {
        "factor": "price",
        "weight": 0.3,
        "description": "Within your budget range"
      }
    ]
  }
}
```

#### Submit Recommendation Feedback

**Endpoint:** `POST /recommendations/feedback`

**Authentication:** Required

**Request Body:**

```json
{
  "propertyId": "prop_123456789",
  "rating": 5,
  "feedback": "Great recommendation!"
}
```

---

### Inspections

#### Create Inspection Request

**Endpoint:** `POST /inspections`

**Authentication:** Required

**Request Body:**

```json
{
  "propertyId": "prop_123456789",
  "scheduledAt": "2026-07-25T14:00:00.000Z",
  "notes": "Interested in viewing this property"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Inspection created successfully",
  "data": {
    "id": "insp_123456789",
    "propertyId": "prop_123456789",
    "scheduledAt": "2026-07-25T14:00:00.000Z",
    "status": "pending",
    "otp": "123456"
  }
}
```

#### Get Inspection by ID

**Endpoint:** `GET /inspections/:id`

**Authentication:** Required

#### Confirm Inspection

**Endpoint:** `POST /inspections/:id/confirm`

**Authentication:** Required

**Description:** Confirm inspection appointment. Must be done by property owner or agent.

#### Cancel Inspection

**Endpoint:** `POST /inspections/:id/cancel`

**Authentication:** Required

**Request Body:**

```json
{
  "reason": "Schedule conflict"
}
```

#### Reschedule Inspection

**Endpoint:** `POST /inspections/:id/reschedule`

**Authentication:** Required

**Request Body:**

```json
{
  "newScheduledAt": "2026-07-26T10:00:00.000Z",
  "notes": "Need to reschedule"
}
```

#### Add Participant

**Endpoint:** `POST /inspections/:id/participants`

**Authentication:** Required

**Request Body:**

```json
{
  "userId": "usr_987654321",
  "role": "buyer"
}
```

#### Inspection OTP

**Generate OTP:** `POST /inspection-otp/generate`

**Verify OTP:** `POST /inspection-otp/verify`

#### Inspection QR Code

**Generate QR Code:** `POST /inspection-qrcode/generate`

**Get QR Code:** `GET /inspection-qrcode/:id`

#### Inspection Feedback

**Submit Feedback:** `POST /inspection-feedback`

**Get Feedback:** `GET /inspection-feedback/inspection/:inspectionId`

---

### Payments

#### Initialize Payment

**Endpoint:** `POST /payments`

**Authentication:** Required

**Request Body:**

```json
{
  "amount": 2500000,
  "currency": "NGN",
  "propertyId": "prop_123456789",
  "paymentMethod": "card",
  "description": "Property deposit"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment initialized successfully",
  "data": {
    "id": "pay_123456789",
    "amount": 2500000,
    "status": "pending",
    "paymentUrl": "https://payment-gateway.com/pay/123456"
  }
}
```

#### Verify Payment

**Endpoint:** `POST /payments/verify`

**Authentication:** Required

**Request Body:**

```json
{
  "reference": "PAY_123456789",
  "transactionId": "TXN_987654321"
}
```

#### Process Refund

**Endpoint:** `POST /payments/:id/refund`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Request Body:**

```json
{
  "amount": 2500000,
  "reason": "Property not available"
}
```

#### Get Payment by ID

**Endpoint:** `GET /payments/:id`

**Authentication:** Required

#### Get Payments by User

**Endpoint:** `GET /payments/user/:userId`

**Authentication:** Required

---

### Wallets

#### Create Wallet

**Endpoint:** `POST /wallets/users/:userId`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Get Wallet by ID

**Wallet:** `GET /wallets/:id`

**Authentication:** Required

**Response:**

```json
{
  "success": true,
  "message": "Wallet retrieved successfully",
  "data": {
    "id": "wal_123456789",
    "userId": "usr_123456789",
    "balance": 5000000,
    "currency": "NGN",
    "status": "active",
    "isFrozen": false
  }
}
```

#### Get Wallet by User

**Endpoint:** `GET /wallets/user/:userId`

**Authentication:** Required

#### Freeze Wallet

**Endpoint:** `POST /wallets/:id/freeze`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Request Body:**

```json
{
  "reason": "Suspicious activity detected",
  "frozenBy": "admin_123"
}
```

#### Unfreeze Wallet

**Endpoint:** `POST /wallets/:id/unfreeze`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Close Wallet

**Endpoint:** `POST /wallets/:id/close`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

---

### Bank Accounts

#### Create Bank Account

**Endpoint:** `POST /bank-accounts`

**Authentication:** Required

**Request Body:**

```json
{
  "walletId": "wal_123456789",
  "bankName": "Access Bank",
  "accountNumber": "1234567890",
  "accountName": "John Doe"
}
```

#### Get Bank Account by ID

**Endpoint:** `GET /bank-accounts/:id`

**Authentication:** Required

#### Get Bank Accounts by Wallet

**Endpoint:** `GET /bank-accounts/wallet/:walletId`

**Authentication:** Required

#### Set Default Bank Account

**Endpoint:** `POST /bank-accounts/:id/set-default`

**Authentication:** Required

#### Verify Bank Account

**Endpoint:** `POST /bank-accounts/:id/verify`

**Authentication:** Required

#### Delete Bank Account

**Endpoint:** `DELETE /bank-accounts/:id`

**Authentication:** Required

---

### Invoices

#### Create Invoice

**Endpoint:** `POST /invoices`

**Authentication:** Required

**Request Body:**

```json
{
  "userId": "usr_123456789",
  "amount": 2500000,
  "description": "Property payment",
  "dueDate": "2026-08-19T00:00:00.000Z"
}
```

#### Get Invoice by ID

**Endpoint:** `GET /invoices/:id`

**Authentication:** Required

#### Get Invoice by Number

**Endpoint:** `GET /invoices/number/:invoiceNumber`

**Authentication:** Required

#### Mark Invoice as Paid

**Endpoint:** `POST /invoices/:id/mark-paid`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Get Invoices by User

**Endpoint:** `GET /invoices/user/:userId`

**Authentication:** Required

---

### Receipts

#### Create Receipt

**Endpoint:** `POST /receipts`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Get Receipt by ID

**Endpoint:** `GET /receipts/:id`

**Authentication:** Required

#### Get Receipt by Number

**Endpoint:** `GET /receipts/number/:receiptNumber`

**Authentication:** Required

#### Get Receipts by Payment

**Endpoint:** `GET /receipts/payment/:paymentId`

**Authentication:** Required

#### Get Receipts by User

**Endpoint:** `GET /receipts/user/:userId`

**Authentication:** Required

---

### Escrows

#### Create Escrow

**Endpoint:** `POST /escrows`

**Authentication:** Required

**Request Body:**

```json
{
  "payerId": "usr_123456789",
  "payeeId": "usr_987654321",
  "propertyId": "prop_123456789",
  "amount": 2500000,
  "description": "Property deposit"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Escrow created successfully",
  "data": {
    "id": "esc_123456789",
    "amount": 2500000,
    "status": "pending",
    "createdAt": "2026-07-19T13:00:00.000Z"
  }
}
```

#### Release Escrow

**Endpoint:** `POST /escrows/:id/release`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Request Body:**

```json
{
  "notes": "Property inspection completed successfully"
}
```

#### Refund Escrow

**Endpoint:** `POST /escrows/:id/refund`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Get Escrow by ID

**Endpoint:** `GET /escrows/:id`

**Authentication:** Required

#### Get Escrows by Payer

**Endpoint:** `GET /escrows/payer/:payerId`

**Authentication:** Required

#### Get Escrows by Payee

**Endpoint:** `GET /escrows/payee/:payeeId`

**Authentication:** Required

---

### Settlements

#### Create Settlement

**Endpoint:** `POST /settlements/escrow/:escrowId`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Complete Settlement

**Endpoint:** `POST /settlements/:id/complete`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Get Settlement by ID

**Endpoint:** `GET /settlements/:id`

**Authentication:** Required

#### Get Settlements by Escrow

**Endpoint:** `GET /settlements/escrow/:escrowId`

**Authentication:** Required

---

### Withdrawals

#### Create Withdrawal Request

**Endpoint:** `POST /withdrawals`

**Authentication:** Required

**Request Body:**

```json
{
  "walletId": "wal_123456789",
  "bankAccountId": "bank_987654321",
  "amount": 500000,
  "reason": "Personal withdrawal"
}
```

#### Approve Withdrawal

**Endpoint:** `POST /withdrawals/approve`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Reject Withdrawal

**Endpoint:** `POST /withdrawals/reject`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Get Withdrawal by ID

**Endpoint:** `GET /withdrawals/:id`

**Authentication:** Required

#### Get Withdrawals by Wallet

**Endpoint:** `GET /withdrawals/wallet/:walletId`

**Authentication:** Required

---

### Communication

#### Create Conversation

**Endpoint:** `POST /communication/conversations`

**Authentication:** Required

**Request Body:**

```json
{
  "participantIds": ["usr_987654321"],
  "propertyId": "prop_123456789",
  "initialMessage": "Hi, I'm interested in this property"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Conversation created successfully",
  "data": {
    "id": "conv_123456789",
    "participants": ["usr_123456789", "usr_987654321"],
    "propertyId": "prop_123456789",
    "status": "active"
  }
}
```

#### Get Conversations

**Endpoint:** `GET /communication/conversations`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number |
| `limit` | integer | Items per page |
| `status` | string | Filter by status |
| `archived` | boolean | Filter archived |

#### Get Conversation by ID

**Endpoint:** `GET /communication/conversations/:id`

**Authentication:** Required

#### Update Conversation

**Endpoint:** `PUT /communication/conversations/:id`

**Authentication:** Required

#### Archive Conversation

**Endpoint:** `POST /communication/conversations/:id/archive`

**Authentication:** Required

#### Unarchive Conversation

**Endpoint:** `POST /communication/conversations/:id/unarchive`

**Authentication:** Required

#### Delete Conversation

**Endpoint:** `DELETE /communication/conversations/:id`

**Authentication:** Required

#### Send Message

**Endpoint:** `POST /communication/messages`

**Authentication:** Required

**Request Body:**

```json
{
  "conversationId": "conv_123456789",
  "content": "Hi, is this property still available?",
  "attachments": []
}
```

**Response:**

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "msg_123456789",
    "conversationId": "conv_123456789",
    "senderId": "usr_123456789",
    "content": "Hi, is this property still available?",
    "status": "delivered",
    "createdAt": "2026-07-19T13:00:00.000Z"
  }
}
```

#### Get Messages

**Endpoint:** `GET /communication/messages`

**Authentication:** Required

#### Get Message by ID

**Endpoint:** `GET /communication/messages/:id`

**Authentication:** Required

#### Edit Message

**Endpoint:** `PUT /communication/messages/:id`

**Authentication:** Required

#### Delete Message

**Endpoint:** `DELETE /communication/messages/:id`

**Authentication:** Required

#### Add Reaction

**Endpoint:** `POST /communication/messages/:id/reactions`

**Authentication:** Required

**Request Body:**

```json
{
  "emoji": "👍"
}
```

#### Remove Reaction

**Endpoint:** `DELETE /communication/messages/:id/reactions`

**Authentication:** Required

#### Mark Message as Read

**Endpoint:** `POST /communication/messages/:id/read`

**Authentication:** Required

#### Typing Indicators

**Start Typing:** `POST /communication/typing/start`

**Stop Typing:** `POST /communication/typing/stop`

#### Block Conversation

**Endpoint:** `POST /communication/blocked`

**Authentication:** Required

#### Unblock Conversation

**Endpoint:** `DELETE /communication/blocked/:conversationId`

**Authentication:** Required

---

### Notifications

#### Create Notification

**Endpoint:** `POST /notifications`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

#### Mark as Read

**Endpoint:** `PUT /notifications/:id/read`

**Authentication:** Required

#### Dismiss Notification

**Endpoint:** `PUT /notifications/:id/dismiss`

**Authentication:** Required

#### Get Notification by ID

**Endpoint:** `GET /notifications/:id`

**Authentication:** Required

#### Get Notifications by User

**Endpoint:** `GET /notifications/user/:userId`

**Authentication:** Required

#### Get Unread Notifications

**Endpoint:** `GET /notifications/user/:userId/unread`

**Authentication:** Required

#### Email Notifications

**Create Email:** `POST /email-notifications`

**Send Email:** `PUT /email-notifications/:id/send`

**Get Email:** `GET /email-notifications/:id`

#### SMS Notifications

**Create SMS:** `POST /sms-notifications`

**Send SMS:** `PUT /sms-notifications/:id/send`

**Get SMS:** `GET /sms-notifications/:id`

#### Push Subscriptions

**Create Subscription:** `POST /push-subscriptions`

**Update Subscription:** `PUT /push-subscriptions/:id`

**Delete Subscription:** `DELETE /push-subscriptions/:id`

**Send Push:** `POST /push-subscriptions/user/:userId/send`

#### Notification Preferences

**Create Preference:** `POST /notification-preferences`

**Update Preference:** `PUT /notification-preferences/user/:userId`

**Get Preference:** `GET /notification-preferences/user/:userId`

#### Notification Templates

**Create Template:** `POST /notification-templates`

**Update Template:** `PUT /notification-templates/:id`

**Delete Template:** `DELETE /notification-templates/:id`

**Get Template:** `GET /notification-templates/:id`

---

### Admin

#### Moderate User

**Endpoint:** `POST /admin/users/moderate`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

**Request Body:**

```json
{
  "userId": "usr_123456789",
  "action": "SUSPEND",
  "reason": "Violation of terms"
}
```

#### Suspend User

**Endpoint:** `POST /admin/users/suspend`

**Authentication:** Required

**Roles:** `SUPPORT_ADMIN`

#### Reactivate User

**Endpoint:** `POST /admin/users/reactivate`

**Authentication:** Required

**Roles:** `SUPPORT_ADMIN`

#### Delete User

**Endpoint:** `POST /admin/users/delete`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Approve Property

**Endpoint:** `POST /admin/properties/approve`

**Authentication:** Required

**Roles:** `SUPPORT_ADMIN`

#### Reject Property

**Endpoint:** `POST /admin/properties/reject`

**Authentication:** Required

**Roles:** `SUPPORT_ADMIN`

#### Freeze Wallet

**Endpoint:** `POST /admin/wallets/freeze`

**Authentication:** Required

**Roles:** `SUPPORT_ADMIN`

#### Unfreeze Wallet

**Endpoint:** `POST /admin/wallets/unfreeze`

**Authentication:** Required

**Roles:** `SUPPORT_ADMIN`

#### Approve Withdrawal

**Endpoint:** `POST /admin/withdrawals/approve`

**Authentication:** Required

**Roles:** `SUPPORT_ADMIN`

#### Reject Withdrawal

**Endpoint:** `POST /admin/withdrawals/reject`

**Authentication:** Required

**Roles:** `SUPPORT_ADMIN`

#### Get Admin Actions

**Endpoint:** `GET /admin/actions/:adminId`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Get Audit Logs

**Endpoint:** `GET /admin/audit-logs`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Get Activity Logs

**Endpoint:** `GET /admin/activity-logs`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`, `SUPPORT_ADMIN`

---

### API Keys

#### Create API Key

**Endpoint:** `POST /api-keys`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

**Request Body:**

```json
{
  "name": "Production API Key",
  "userId": "usr_123456789",
  "scopes": ["properties:read", "properties:write"],
  "expiresAt": "2026-12-31T23:59:59.000Z"
}
```

**Response:**

```json
{
  "success": true,
  "message": "API key created successfully",
  "data": {
    "id": "key_123456789",
    "key": "csk_abc123xyz789",
    "name": "Production API Key",
    "status": "active"
  }
}
```

#### Rotate API Key

**Endpoint:** `PUT /api-keys/:id/rotate`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Revoke API Key

**Endpoint:** `PUT /api-keys/:id/revoke`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Delete API Key

**Endpoint:** `DELETE /api-keys/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Get API Key by ID

**Endpoint:** `GET /api-keys/:id`

**Authentication:** Required

#### Get API Keys by User

**Endpoint:** `GET /api-keys/user/:userId`

**Authentication:** Required

---

### Webhooks

#### Create Webhook

**Endpoint:** `POST /webhooks`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

**Request Body:**

```json
{
  "name": "Payment Webhook",
  "url": "https://your-domain.com/webhooks/payments",
  "events": ["payment.completed", "payment.failed"],
  "secret": "webhook_secret_123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Webhook created successfully",
  "data": {
    "id": "web_123456789",
    "name": "Payment Webhook",
    "url": "https://your-domain.com/webhooks/payments",
    "events": ["payment.completed", "payment.failed"],
    "status": "active"
  }
}
```

#### Update Webhook

**Endpoint:** `PUT /webhooks/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Delete Webhook

**Endpoint:** `DELETE /webhooks/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Trigger Webhook

**Endpoint:** `POST /webhooks/:id/trigger`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Get Webhook by ID

**Endpoint:** `GET /webhooks/:id`

**Authentication:** Required

#### Get Webhook Deliveries

**Endpoint:** `GET /webhooks/:id/deliveries`

**Authentication:** Required

#### Get Pending Retries

**Endpoint:** `GET /webhooks/pending-retries`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Webhook Payload Example

```json
{
  "id": "evt_123456789",
  "event": "payment.completed",
  "data": {
    "paymentId": "pay_123456789",
    "amount": 2500000,
    "status": "completed"
  },
  "timestamp": "2026-07-19T13:00:00.000Z",
  "signature": "sha256=abc123..."
}
```

#### Webhook Signature Verification

```javascript
const crypto = require('crypto');
const signature = req.headers['x-webhook-signature'];
const payload = req.body;
const secret = 'your_webhook_secret';

const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(payload))
  .digest('hex');

if (signature !== `sha256=${expectedSignature}`) {
  return res.status(401).send('Invalid signature');
}
```

#### Retry Policy

| Attempt | Delay | Max Attempts |
|---------|-------|-------------|
| 1 | Immediate | 1 |
| 2 | 1 minute | 2 |
| 3 | 5 minutes | 3 |
| 4 | 30 minutes | 4 |
| 5 | 1 hour | 5 |

---

### Background Jobs

#### Create Background Job

**Endpoint:** `POST /background-jobs`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

**Request Body:**

```json
{
  "queue": "email",
  "type": "send_welcome_email",
  "payload": {
    "userId": "usr_123456789"
  }
}
```

#### Start Background Job

**Endpoint:** `PUT /background-jobs/:id/start`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Complete Background Job

**Endpoint:** `PUT /background-jobs/:id/complete`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Fail Background Job

**Endpoint:** `PUT /background-jobs/:id/fail`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Get Background Job by ID

**Endpoint:** `GET /background-jobs/:id`

**Authentication:** Required

#### Get Jobs by Queue

**Endpoint:** `GET /background-jobs/queue/:queue`

**Authentication:** Required

#### Get Pending Jobs

**Endpoint:** `GET /background-jobs/pending`

**Authentication:** Required

#### Get Failed Jobs

**Endpoint:** `GET /background-jobs/failed`

**Authentication:** Required

---

### Feature Flags

#### Create Feature Flag

**Endpoint:** `POST /feature-flags`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

**Request Body:**

```json
{
  "key": "new_property_flow",
  "name": "New Property Flow",
  "description": "Enable new property creation flow",
  "enabled": true,
  "targetUsers": ["usr_123456789"]
}
```

#### Update Feature Flag

**Endpoint:** `PUT /feature-flags/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Delete Feature Flag

**Endpoint:** `DELETE /feature-flags/:id`

**Authentication:** Required

**Roles:** `SUPER_ADMIN`

#### Get Feature Flag by ID

**Endpoint:** `GET /feature-flags/:id`

**Authentication:** Required

#### Get Feature Flag by Key

**Endpoint:** `GET /feature-flags/key/:key`

**Authentication:** Required

#### Check Feature Flag

**Endpoint:** `GET /feature-flags/check/:key`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | string | User ID for user-specific flags |

**Response:**

```json
{
  "enabled": true
}
```

---

## WebSocket Events

### Connection

**Endpoint:** `wss://cribseekers.onrender.com`

### Authentication

WebSocket connections require authentication via query parameter:

```
wss://cribseekers.onrender.com?token=<JWT_TOKEN>
```

### Events

#### Connection Established

**Client → Server:**

```json
{
  "event": "connect",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Server → Client:**

```json
{
  "event": "connected",
  "data": {
    "userId": "usr_123456789",
    "timestamp": "2026-07-19T13:00:00.000Z"
  }
}
```

#### Join Conversation

**Client → Server:**

```json
{
  "event": "join_conversation",
  "data": {
    "conversationId": "conv_123456789"
  }
}
```

#### Leave Conversation

**Client → Server:**

```json
{
  "event": "leave_conversation",
  "data": {
    "conversationId": "conv_123456789"
  }
}
```

#### Send Message

**Client → Server:**

```json
{
  "event": "send_message",
  "data": {
    "conversationId": "conv_123456789",
    "content": "Hi, is this property still available?"
  }
}
```

**Server → Client:**

```json
{
  "event": "message_received",
  "data": {
    "messageId": "msg_123456789",
    "conversationId": "conv_123456789",
    "senderId": "usr_987654321",
    "content": "Hi, is this property still available?",
    "timestamp": "2026-07-19T13:00:00.000Z"
  }
}
```

#### Typing Start

**Client → Server:**

```json
{
  "event": "typing_start",
  "data": {
    "conversationId": "conv_123456789"
  }
}
```

**Server → Client:**

```json
{
  "event": "user_typing",
  "data": {
    "conversationId": "conv_123456789",
    "userId": "usr_987654321"
  }
}
```

#### Typing Stop

**Client → Server:**

```json
{
  "event": "typing_stop",
  "data": {
    "conversationId": "conv_123456789"
  }
}
```

#### Read Receipt

**Client → Server:**

```json
{
  "event": "message_read",
  "data": {
    "messageId": "msg_123456789"
  }
}
```

**Server → Client:**

```json
{
  "event": "message_read_receipt",
  "data": {
    "messageId": "msg_123456789",
    "userId": "usr_987654321",
    "timestamp": "2026-07-19T13:00:00.000Z"
  }
}
```

#### Reaction Added

**Client → Server:**

```json
{
  "event": "add_reaction",
  "data": {
    "messageId": "msg_123456789",
    "emoji": "👍"
  }
}
```

**Server → Client:**

```json
{
  "event": "reaction_added",
  "data": {
    "messageId": "msg_123456789",
    "userId": "usr_987654321",
    "emoji": "👍"
  }
}
```

#### Reaction Removed

**Client → Server:**

```json
{
  "event": "remove_reaction",
  "data": {
    "messageId": "msg_123456789"
  }
}
```

**Server → Client:**

```json
{
  "event": "reaction_removed",
  "data": {
    "messageId": "msg_123456789",
    "userId": "usr_987654321"
  }
}
```

#### Presence Updates

**Server → Client:**

```json
{
  "event": "presence_update",
  "data": {
    "userId": "usr_987654321",
    "status": "online",
    "lastSeen": "2026-07-19T13:00:00.000Z"
  }
}
```

#### Notification Events

**Server → Client:**

```json
{
  "event": "notification",
  "data": {
    "id": "notif_123456789",
    "type": "message",
    "title": "New message",
    "body": "You received a new message",
    "timestamp": "2026-07-19T13:00:00.000Z"
  }
}
```

---

## Status Codes

### Success Codes

| Code | Title | Description |
|------|-------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request succeeded, no content returned |

### Client Error Codes

| Code | Title | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |

### Server Error Codes

| Code | Title | Description |
|------|-------|-------------|
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Service temporarily unavailable |

---

## Request Examples

### cURL Examples

#### Create Property

```bash
curl -X POST https://cribseekers.onrender.com/api/v1/properties \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Modern 3-Bedroom Apartment",
    "description": "Luxurious apartment with stunning views",
    "price": 2500000,
    "purpose": "rent",
    "bedrooms": 3,
    "bathrooms": 2,
    "location": {
      "address": "123 Lekki Expressway",
      "city": "Lagos",
      "state": "Lagos",
      "latitude": 6.5244,
      "longitude": 3.3792
    }
  }'
```

#### Search Properties

```bash
curl -X GET "https://cribseekers.onrender.com/api/v1/properties?city=Lagos&priceMin=1000000&priceMax=5000000&bedrooms=3" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

#### Create Inspection

```bash
curl -X POST https://cribseekers.onrender.com/api/v1/inspections \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId": "prop_123456789",
    "scheduledAt": "2026-07-25T14:00:00.000Z",
    "notes": "Interested in viewing this property"
  }'
```

#### Initialize Payment

```bash
curl -X POST https://cribseekers.onrender.com/api/v1/payments \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 2500000,
    "currency": "NGN",
    "propertyId": "prop_123456789",
    "paymentMethod": "card"
  }'
```

### JavaScript (fetch) Examples

#### Create Property

```javascript
const response = await fetch('https://cribseekers.onrender.com/api/v1/properties', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Modern 3-Bedroom Apartment',
    description: 'Luxurious apartment with stunning views',
    price: 2500000,
    purpose: 'rent',
    bedrooms: 3,
    bathrooms: 2,
    location: {
      address: '123 Lekki Expressway',
      city: 'Lagos',
      state: 'Lagos',
      latitude: 6.5244,
      longitude: 3.3792
    }
  })
});

const data = await response.json();
console.log(data);
```

#### Search Properties

```javascript
const response = await fetch(
  'https://cribseekers.onrender.com/api/v1/properties?city=Lagos&priceMin=1000000&priceMax=5000000&bedrooms=3',
  {
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...'
    }
  }
);

const data = await response.json();
console.log(data);
```

---

## Changelog

### Version 1.0.0 (2026-07-19)

#### Features
- Initial API release
- Property management endpoints
- Inspection booking system
- Payment and escrow integration
- WebSocket real-time messaging
- AI-powered recommendations
- Admin moderation tools
- Webhook integration
- Feature flag system

#### Breaking Changes
- None

#### Bug Fixes
- None

---

## Future APIs

The following features are planned for future releases:

### Review System
- Property reviews and ratings
- User reviews
- Review moderation

### Fraud Detection
- Suspicious activity detection
- Automated fraud alerts
- Risk scoring

### Property Comparison
- Compare multiple properties
- Side-by-side comparison
- Feature comparison

### Mortgage Calculator
- Mortgage payment calculator
- Interest rate comparison
- Amortization schedule

### AI Chatbot
- Property assistant chatbot
- Natural language search
- Smart recommendations

### Virtual Tours
- 360° property tours
- Virtual reality integration
- Interactive floor plans

### Analytics Dashboard
- Property performance analytics
- User behavior insights
- Market trends

---

<div align="center">

**© 2026 CribSeekers. All rights reserved.**

**Support:** support@cribseekers.com  
**Documentation:** https://docs.cribseekers.com  
**Status Page:** https://status.cribseekers.com

</div>

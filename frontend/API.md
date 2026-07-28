# CribSeekers Frontend API Documentation

**Version:** 1.0.0 (Release Candidate 1)
**Date:** July 27, 2026
**Backend API Base URL:** `https://cribseekers.onrender.com/api/v1`

---

## Overview

This document describes the API integration between the CribSeekers frontend and backend. The frontend uses Axios as the HTTP client with automatic JWT authentication and token refresh.

## API Client Configuration

### Base URL
- **Production:** `https://cribseekers.onrender.com/api/v1`
- **Development:** Configured via `NEXT_PUBLIC_API_URL` environment variable

### Authentication
- **Type:** JWT Bearer tokens
- **Header:** `Authorization: Bearer {access_token}`
- **Token Storage:** localStorage (access_token, refresh_token)
- **Automatic Refresh:** Implemented in Axios interceptor on 401 responses

### Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
```

---

## API Endpoints

### Authentication

#### POST /auth/login
Login user with email and password.

**Request:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}
```

#### POST /auth/signup
Register new user.

**Request:**
```typescript
{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: 'buyer' | 'seller' | 'agent';
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}
```

#### POST /auth/logout
Logout user and invalidate tokens.

**Request:**
```typescript
{
  refreshToken: string;
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request:**
```typescript
{
  refreshToken: string;
}
```

**Response:**
```typescript
{
  success: true;
  data: {
    accessToken: string;
  };
}
```

#### POST /auth/forgot-password
Initiate password reset.

**Request:**
```typescript
{
  email: string;
}
```

#### POST /auth/reset-password
Reset password with token.

**Request:**
```typescript
{
  token: string;
  newPassword: string;
}
```

#### POST /auth/verify-email
Verify user email.

**Request:**
```typescript
{
  token: string;
}
```

#### POST /auth/verify-phone
Verify user phone number.

**Request:**
```typescript
{
  phone: string;
  otp: string;
}
```

#### POST /auth/verify-otp
Verify OTP code.

**Request:**
```typescript
{
  otp: string;
  purpose: 'email' | 'phone';
}
```

#### POST /auth/change-password
Change user password (authenticated).

**Request:**
```typescript
{
  currentPassword: string;
  newPassword: string;
}
```

---

### Users

#### GET /users/me
Get current user profile.

**Response:**
```typescript
{
  success: true;
  data: User;
}
```

#### PUT /users/me
Update current user profile.

**Request:**
```typescript
{
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
}
```

#### POST /users/me/password
Change user password.

**Request:**
```typescript
{
  currentPassword: string;
  newPassword: string;
}
```

#### POST /users/me/avatar
Upload user avatar.

**Request:** `FormData` with `avatar` file.

**Response:**
```typescript
{
  success: true;
  data: {
    avatarUrl: string;
  };
}
```

#### POST /users/me/kyc
Submit KYC documents.

**Request:** `FormData` with KYC documents.

#### GET /users/me/kyc/status
Get KYC verification status.

**Response:**
```typescript
{
  success: true;
  data: {
    status: 'pending' | 'approved' | 'rejected';
    documents: KYCDocument[];
  };
}
```

#### GET /users/{id}
Get user by ID.

**Response:**
```typescript
{
  success: true;
  data: User;
}
```

---

### Properties

#### GET /properties
Get all properties with pagination and filters.

**Query Parameters:**
- `page` (number) - Page number
- `limit` (number) - Items per page
- `type` (string) - Property type
- `purpose` (string) - Property purpose (rent/sale)
- `state` (string) - State filter
- `city` (string) - City filter
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price
- `featured` (boolean) - Featured properties only

**Response:**
```typescript
{
  success: true;
  data: Property[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

#### POST /properties
Create new property.

**Request:**
```typescript
{
  title: string;
  description: string;
  type: string;
  category: string;
  purpose: 'rent' | 'sale';
  price: number;
  currency: string;
  address: string;
  city: string;
  state: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    state: string;
    address: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    area: number;
    areaUnit: string;
  };
  amenities: string[];
  images: string[];
  videos?: string[];
  documents?: string[];
  floorPlans?: string[];
}
```

#### GET /properties/search
Search properties with advanced filters.

**Query Parameters:** Same as GET /properties plus:
- `query` (string) - Search query
- `recent` (boolean) - Recent properties only

#### GET /properties/featured
Get featured properties.

**Response:**
```typescript
{
  success: true;
  data: Property[];
}
```

#### GET /properties/published
Get published properties.

**Response:**
```typescript
{
  success: true;
  data: Property[];
}
```

#### GET /properties/drafts
Get draft properties.

**Response:**
```typescript
{
  success: true;
  data: Property[];
}
```

#### GET /properties/pending
Get pending properties.

**Response:**
```typescript
{
  success: true;
  data: Property[];
}
```

#### GET /properties/rejected
Get rejected properties.

**Response:**
```typescript
{
  success: true;
  data: Property[];
}
```

#### GET /properties/{id}
Get property by ID.

**Response:**
```typescript
{
  success: true;
  data: Property;
}
```

#### PUT /properties/{id}
Update property.

**Request:** Same as POST /properties

#### DELETE /properties/{id}
Delete property.

**Response:**
```typescript
{
  success: true;
  message: "Property deleted successfully";
}
```

#### GET /properties/{id}/summary
Get property summary.

**Response:**
```typescript
{
  success: true;
  data: {
    views: number;
    inquiries: number;
    inspections: number;
  };
}
```

#### POST /properties/{id}/publish
Publish property.

**Response:**
```typescript
{
  success: true;
  data: Property;
}
```

#### POST /properties/{id}/unpublish
Unpublish property.

**Response:**
```typescript
{
  success: true;
  data: Property;
}
```

#### POST /properties/{id}/verify
Verify property.

**Response:**
```typescript
{
  success: true;
  data: Property;
}
```

#### POST /properties/{id}/archive
Archive property.

**Response:**
```typescript
{
  success: true;
  data: Property;
}
```

#### POST /properties/{id}/duplicate
Duplicate property.

**Response:**
```typescript
{
  success: true;
  data: Property;
}
```

#### POST /properties/{id}/feature
Feature property.

**Response:**
```typescript
{
  success: true;
  data: Property;
}
```

#### POST /properties/{id}/unfeature
Unfeature property.

**Response:**
```typescript
{
  success: true;
  data: Property;
}
```

#### POST /properties/{id}/views
Increment property view count.
#### POST /properties/{id}/inquiries
Increment property inquiry count.
#### GET /properties/{id}/analytics
Get property analytics.
#### GET /properties/{id}/images
Get property images.
#### GET /properties/{id}/amenities
Get property amenities.
#### GET /properties/{id}/nearby
Get nearby properties.
#### GET /properties/{id}/timeline
Get property timeline.
#### GET /properties/{id}/documents
Get property documents.

---

### Inspections

#### GET /inspections
Get all inspections.

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `status` (string)
- `type` (string)
- `userId` (string)

**Response:**
```typescript
{
  success: true;
  data: Inspection[];
  meta: PaginationMeta;
}
```

#### POST /inspections
Book inspection.

**Request:**
```typescript
{
  propertyId: string;
  date: string;
  time: string;
  type: 'in_person' | 'virtual' | 'self_tour';
  notes?: string;
}
```

#### GET /inspections/{id}
Get inspection by ID.

**Response:**
```typescript
{
  success: true;
  data: Inspection;
}
```

#### PUT /inspections/{id}
Update inspection.

#### DELETE /inspections/{id}
Cancel inspection.

#### POST /inspections/{id}/reschedule
Reschedule inspection.

**Request:**
```typescript
{
  date: string;
  time: string;
}
```

#### POST /inspections/{id}/feedback
Submit inspection feedback.

**Request:**
```typescript
{
  rating: number;
  comment: string;
}
```

---

### Wallet

#### GET /wallet
Get wallet information.

**Response:**
```typescript
{
  success: true;
  data: {
    balance: number;
    currency: string;
    accountNumber: string;
    bankName: string;
  };
}
```

#### GET /wallet/transactions
Get transaction history.

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `type` (string)

**Response:**
```typescript
{
  success: true;
  data: Transaction[];
  meta: PaginationMeta;
}
```

#### POST /wallet/fund
Fund wallet.

**Request:**
```typescript
{
  amount: number;
  paymentMethod: string;
}
```

#### POST /wallet/withdraw
Withdraw from wallet.

**Request:**
```typescript
{
  amount: number;
  bankAccountId: string;
}
```

#### GET /wallet/bank-accounts
Get bank accounts.

**Response:**
```typescript
{
  success: true;
  data: BankAccount[];
}
```

#### POST /wallet/bank-accounts
Add bank account.

**Request:**
```typescript
{
  bankName: string;
  accountNumber: string;
  accountName: string;
}
```

---

### Escrow

#### GET /escrow
Get all escrow transactions.

**Response:**
```typescript
{
  success: true;
  data: Escrow[];
}
```

#### POST /escrow
Create escrow.

**Request:**
```typescript
{
  propertyId: string;
  payerId: string;
  payeeId: string;
  walletId: string;
  amount: number;
  description: string;
}
```

#### GET /escrow/{id}
Get escrow by ID.

**Response:**
```typescript
{
  success: true;
  data: Escrow;
}
```

#### POST /escrow/{id}/release
Release escrow funds.

#### POST /escrow/{id}/refund
Refund escrow funds.

---

### Conversations

#### GET /conversations
Get all conversations.

**Response:**
```typescript
{
  success: true;
  data: Conversation[];
}
```

#### GET /conversations/{id}
Get conversation by ID.

**Response:**
```typescript
{
  success: true;
  data: Conversation;
}
```

#### POST /conversations
Create conversation.

**Request:**
```typescript
{
  participantId: string;
  propertyId?: string;
}
```

#### GET /conversations/{id}/messages
Get conversation messages.

**Response:**
```typescript
{
  success: true;
  data: Message[];
}
```

#### POST /conversations/{id}/messages
Send message.

**Request:**
```typescript
{
  content: string;
  type: 'text' | 'image';
}
```

---

### Search

#### GET /search
Global search.

**Query Parameters:**
- `query` (string)
- `type` (string) - 'properties', 'users', 'agents'
- `limit` (number)

**Response:**
```typescript
{
  success: true;
  data: SearchResult[];
}
```

#### GET /search/recent
Get recent searches.

**Response:**
```typescript
{
  success: true;
  data: RecentSearch[];
}
```

#### GET /search/popular
Get popular searches.

**Response:**
```typescript
{
  success: true;
  data: string[];
}
```

---

### Notifications

#### GET /notifications
Get user notifications.

**Query Parameters:**
- `page` (number)
- `limit` (number)
- `unread` (boolean)

**Response:**
```typescript
{
  success: true;
  data: Notification[];
  meta: PaginationMeta;
}
```

#### PUT /notifications/{id}/read
Mark notification as read.

#### PUT /notifications/read-all
Mark all notifications as read.

#### DELETE /notifications/{id}
Delete notification.

---

### Storage

#### POST /storage/upload
Upload file.

**Request:** `FormData` with `file` and `type` (image, video, document, floorplan).

**Response:**
```typescript
{
  success: true;
  data: {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  };
}
```

#### POST /storage/upload-multiple
Upload multiple files.

**Request:** `FormData` with `files` array and `type`.

**Response:**
```typescript
{
  success: true;
  data: StorageFile[];
}
```

---

## WebSocket Events

### Connection
```typescript
const socket = io(SOCKET_URL, {
  auth: { token: accessToken }
});
```

### Events

#### message:received
Receive new message.
```typescript
{
  conversationId: string;
  message: Message;
}
```

#### message:typing
Typing indicator.
```typescript
{
  conversationId: string;
  userId: string;
  isTyping: boolean;
}
```

#### notification:new
New notification.
```typescript
{
  notification: Notification;
}
```

#### inspection:status
Inspection status change.
```typescript
{
  inspectionId: string;
  status: string;
}
```

---

## Error Handling

### HTTP Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized (token refresh attempted)
- **403** - Forbidden
- **404** - Not Found
- **409** - Conflict
- **422** - Validation Error
- **500** - Server Error

### Error Response Format
```typescript
{
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
```

---

## Rate Limiting

- **Default:** 100 requests per minute
- **Authenticated:** 200 requests per minute
- **Headers:** `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Frontend Integration

### Using the API Client

```typescript
import { apiClient } from '@/services/api';

// GET request
const response = await apiClient.get('/properties');

// POST request
const response = await apiClient.post('/properties', propertyData);

// PUT request
const response = await apiClient.put(`/properties/${id}`, updates);

// DELETE request
const response = await apiClient.delete(`/properties/${id}`);
```

### Using React Query Hooks

```typescript
import { useProperties } from '@/hooks/useProperty';

function PropertiesPage() {
  const { data, isLoading, error } = useProperties();
  
  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;
  
  return <PropertyList properties={data} />;
}
```

---

## TypeScript Types

All API types are defined in `types/` directory:
- `api.types.ts` - API response types
- `auth.types.ts` - Authentication types
- `property.types.ts` - Property types
- `inspection.types.ts` - Inspection types
- `wallet.types.ts` - Wallet types
- `escrow.types.ts` - Escrow types

---

**End of API Documentation**

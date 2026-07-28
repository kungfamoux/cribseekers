# CribSeekers Frontend

Nigeria's Premier Real Estate Platform - Frontend Application

## Overview

CribSeekers is a modern real estate platform built for the Nigerian market, enabling users to buy, rent, and sell properties with confidence through secure escrow transactions and verified listings.

## Tech Stack

- **Framework:** Next.js 15.0.3 (App Router)
- **Language:** TypeScript 5.6.3
- **UI:** React 19.0.0
- **Styling:** Tailwind CSS 3.4.19
- **State Management:** Zustand 5.0.1
- **Data Fetching:** @tanstack/react-query 5.59.20
- **Forms:** react-hook-form 7.53.2 + zod 3.23.8
- **HTTP Client:** Axios 1.7.9
- **Real-time:** Socket.io-client 4.8.1
- **Animations:** Framer Motion 11.11.17
- **Icons:** Lucide React 0.454.0
- **Charts:** Recharts 2.13.3
- **Notifications:** Sonner 1.5.0
- **Maps:** @googlemaps/js-api-loader 2.1.1

## Features

### Authentication
- Email/password registration and login
- Email verification
- Phone verification
- Password reset
- JWT-based authentication with automatic token refresh
- Account type selection (Buyer, Seller, Agent)

### Property Management
- Property creation with multi-step wizard
- Property editing and management
- Draft management
- Property publishing workflow
- Image gallery management
- Video uploads
- Floor plan uploads
- Document uploads
- Property analytics
- Property verification status

### Property Discovery
- Advanced search with filters
- Location-based search
- Property type filtering
- Price range filtering
- Featured properties
- Recent properties
- Property comparison
- Saved properties
- Search history

### Inspections
- Inspection booking
- Calendar view
- Time slot selection
- Virtual inspections
- Self-tour options
- Inspection rescheduling
- Inspection cancellation
- Inspection feedback
- QR code generation

### Wallet & Payments
- Wallet funding
- Bank account management
- Transaction history
- Withdrawals
- Payment verification

### Escrow
- Escrow creation
- Escrow management
- Secure transaction handling
- Payment protection

### Messaging
- Real-time messaging
- Conversation management
- Agent communication

### Dashboard
- Property overview
- Inspection management
- Wallet overview
- Activity tracking
- Notifications
- Recommendations

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Dashboard pages
│   ├── properties/        # Property management
│   ├── inspections/       # Inspection management
│   ├── api/               # API routes
│   └── public/            # Public pages
├── components/             # React components
│   ├── dashboard/         # Dashboard components
│   ├── properties/        # Property components
│   ├── inspections/       # Inspection components
│   ├── wallet/            # Wallet components
│   ├── escrow/            # Escrow components
│   ├── public/            # Public components
│   ├── shared/            # Reusable components
│   └── providers/         # Context providers
├── hooks/                 # Custom React hooks
├── services/              # API services
├── types/                 # TypeScript types
├── store/                 # Zustand state
├── lib/                   # Library utilities
├── utils/                 # Helper utilities
└── public/                # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/cribseekers.git
cd cribseekers/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=https://cribseekers.onrender.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://cribseekers.onrender.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key_here
NODE_ENV=development
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Environment Variables

### Required
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `NEXT_PUBLIC_SOCKET_URL` - WebSocket server URL
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY` - Google Maps API key

### Optional (Production)
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` - Google Analytics ID
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN for error tracking
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Enable analytics (true/false)
- `NEXT_PUBLIC_ENABLE_ERROR_REPORTING` - Enable error reporting (true/false)

## Type Safety

This project uses TypeScript with strict mode enabled. All type definitions are centralized in the `types/` directory.

Run type checking:
```bash
npm run type-check
```

## Code Quality

### ESLint
The project uses ESLint with Next.js configuration. Run linting:
```bash
npm run lint
```

### Prettier
Code formatting is handled by Prettier. Format code:
```bash
npm run format
```

## Build & Deployment

### Production Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Deployment Platforms
- **Vercel:** Recommended for Next.js applications
- **Netlify:** Alternative deployment option
- **Docker:** Containerized deployment available

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## API Integration

The frontend communicates with the backend via REST API. All API endpoints are defined in `services/api/endpoints.ts`.

API client configuration is in `services/api/axios.ts` with:
- Automatic token injection
- Token refresh on 401
- Error handling for common HTTP status codes

## State Management

- **Client State:** Zustand stores in `store/`
- **Server State:** React Query hooks in `hooks/`
- **Form State:** react-hook-form with zod validation

## Security

- JWT-based authentication
- Automatic token refresh
- Secure HTTP headers (HSTS, CSP, X-Frame-Options, etc.)
- Environment variable protection
- Input validation with zod

See [SECURITY.md](./SECURITY.md) for detailed security information.

## Testing

Currently, the project does not have automated tests. Testing infrastructure is planned for future phases.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture documentation
- [API.md](./API.md) - API documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [SECURITY.md](./SECURITY.md) - Security guidelines
- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Environment setup guide

## License

Proprietary - All rights reserved

## Support

For support, contact support@cribseekers.com

## Version

Current version: 1.0.0 (Release Candidate 1)

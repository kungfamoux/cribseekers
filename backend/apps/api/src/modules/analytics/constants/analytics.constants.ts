export const ANALYTICS_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_SORT_BY: 'createdAt',
  DEFAULT_SORT_ORDER: 'desc' as const,
  
  TIMEZONE: 'Africa/Lagos',
  CURRENCY: 'NGN',
  
  EXPORT_FORMATS: {
    CSV: 'csv',
    EXCEL: 'xlsx',
    PDF: 'pdf',
  },
  
  REPORT_PERIODS: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    CUSTOM: 'custom',
  },
  
  DASHBOARD_TYPES: {
    PLATFORM_OVERVIEW: 'platform_overview',
    PROPERTIES: 'properties',
    USERS: 'users',
    AGENTS: 'agents',
    LANDLORDS: 'landlords',
    INSPECTIONS: 'inspections',
    PAYMENTS: 'payments',
    WALLETS: 'wallets',
    REVENUE: 'revenue',
    COMMUNICATION: 'communication',
    RECOMMENDATIONS: 'recommendations',
    MODERATION: 'moderation',
    STORAGE: 'storage',
    SEARCH: 'search',
    SYSTEM_HEALTH: 'system_health',
  },
  
  METRIC_TYPES: {
    COUNT: 'count',
    SUM: 'sum',
    AVERAGE: 'average',
    PERCENTAGE: 'percentage',
    RATE: 'rate',
  },
  
  USER_ROLES: {
    TENANT: 'TENANT',
    AGENT: 'AGENT',
    LANDLORD: 'LANDLORD',
    ADMIN: 'ADMIN',
  },
  
  PROPERTY_STATUS: {
    PUBLISHED: 'PUBLISHED',
    VERIFIED: 'VERIFIED',
    AVAILABLE: 'AVAILABLE',
    RENTED: 'RENTED',
    FEATURED: 'FEATURED',
  },
  
  INSPECTION_STATUS: {
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    SCHEDULED: 'SCHEDULED',
  },
  
  PAYMENT_STATUS: {
    COMPLETED: 'COMPLETED',
    REFUNDED: 'REFUNDED',
    WITHDRAWN: 'WITHDRAWN',
  },
  
  CACHE_TTL: {
    DASHBOARD: 300, // 5 minutes
    REPORT: 600, // 10 minutes
    METRICS: 1800, // 30 minutes
  },
  
  EXPORT_LIMITS: {
    MAX_ROWS: 100000,
    CHUNK_SIZE: 1000,
  },
} as const;

export const APP_NAME = 'CribSeekers';
export const APP_DESCRIPTION = 'Modern Nigerian real estate platform';
export const APP_VERSION = '1.0.0';

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 20,
  BIO_MAX_LENGTH: 500,
} as const;

export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/quicktime'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
} as const;

export const CURRENCY = {
  DEFAULT: 'NGN',
  SYMBOLS: {
    NGN: '₦',
    USD: '$',
    EUR: '€',
    GBP: '£',
  } as const,
} as const;

export const TIMEZONE = 'Africa/Lagos';

export const DATE_FORMAT = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  DISPLAY: 'MMMM D, YYYY',
  DISPLAY_DATETIME: 'MMMM D, YYYY h:mm A',
} as const;

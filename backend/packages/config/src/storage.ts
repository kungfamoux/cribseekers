export const STORAGE_CONFIG = {
  PROVIDER: 'local', // 'local' | 's3' | 'cloudinary'
  LOCAL: {
    UPLOAD_DIR: './uploads',
    PUBLIC_URL: '/uploads',
  },
  S3: {
    BUCKET: process.env.AWS_S3_BUCKET || '',
    REGION: process.env.AWS_REGION || 'us-east-1',
    ACL: 'public-read',
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
    API_KEY: process.env.CLOUDINARY_API_KEY || '',
    API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
  },
  DIRECTORIES: {
    PROPERTIES: 'properties',
    PROFILES: 'profiles',
    DOCUMENTS: 'documents',
    VIDEOS: 'videos',
    TEMP: 'temp',
  },
} as const;

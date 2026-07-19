export const QueueConfig = {
  // Email Queue Configuration
  email: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: 100,
      removeOnFail: 50,
    },
    limiter: {
      max: 100,
      duration: 60000, // 100 emails per minute
    },
  },

  // SMS Queue Configuration
  sms: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: 100,
      removeOnFail: 50,
    },
    limiter: {
      max: 50,
      duration: 60000, // 50 SMS per minute
    },
  },

  // Push Notification Queue Configuration
  push: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: 500,
      removeOnFail: 100,
    },
    limiter: {
      max: 1000,
      duration: 60000, // 1000 push notifications per minute
    },
  },

  // Image Processing Queue Configuration
  image: {
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: 50,
      removeOnFail: 20,
    },
    limiter: {
      max: 10,
      duration: 60000, // 10 image processing jobs per minute
    },
  },

  // Video Processing Queue Configuration
  video: {
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
      removeOnComplete: 20,
      removeOnFail: 10,
    },
    limiter: {
      max: 2,
      duration: 60000, // 2 video processing jobs per minute
    },
  },

  // Property Queue Configuration
  property: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
      removeOnComplete: 200,
      removeOnFail: 50,
    },
    limiter: {
      max: 50,
      duration: 60000, // 50 property operations per minute
    },
  },

  // Recommendation Queue Configuration
  recommendation: {
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: 100,
      removeOnFail: 30,
    },
    limiter: {
      max: 20,
      duration: 60000, // 20 recommendation calculations per minute
    },
  },

  // Analytics Queue Configuration
  analytics: {
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: 500,
      removeOnFail: 100,
    },
    limiter: {
      max: 100,
      duration: 60000, // 100 analytics aggregations per minute
    },
  },

  // Report Generation Queue Configuration
  report: {
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
      removeOnComplete: 50,
      removeOnFail: 20,
    },
    limiter: {
      max: 5,
      duration: 60000, // 5 report generations per minute
    },
  },

  // Settlement Queue Configuration
  settlement: {
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
      removeOnComplete: 100,
      removeOnFail: 50,
    },
    limiter: {
      max: 20,
      duration: 60000, // 20 settlement operations per minute
    },
  },

  // Payment Queue Configuration
  payment: {
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: 200,
      removeOnFail: 100,
    },
    limiter: {
      max: 50,
      duration: 60000, // 50 payment operations per minute
    },
  },

  // Webhook Queue Configuration
  webhook: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: 500,
      removeOnFail: 100,
    },
    limiter: {
      max: 200,
      duration: 60000, // 200 webhook calls per minute
    },
  },

  // Search Queue Configuration
  search: {
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
      removeOnComplete: 200,
      removeOnFail: 50,
    },
    limiter: {
      max: 30,
      duration: 60000, // 30 search index updates per minute
    },
  },

  // Inspection Queue Configuration
  inspection: {
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
      removeOnComplete: 100,
      removeOnFail: 30,
    },
    limiter: {
      max: 20,
      duration: 60000, // 20 inspection operations per minute
    },
  },

  // Cleanup Queue Configuration
  cleanup: {
    defaultJobOptions: {
      attempts: 2,
      backoff: {
        type: 'exponential',
        delay: 10000,
      },
      removeOnComplete: 50,
      removeOnFail: 20,
    },
    limiter: {
      max: 10,
      duration: 60000, // 10 cleanup operations per minute
    },
  },
} as const;

export type QueueName = keyof typeof QueueConfig;

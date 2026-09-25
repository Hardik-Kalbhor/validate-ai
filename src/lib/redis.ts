import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const hasRedis = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = hasRedis
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

/**
 * Rate limiter: 10 validation requests per user per hour.
 * Falls back safely to allow-all if Redis is not configured in local environment.
 */
export const validationRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 h'),
      analytics: true,
      prefix: 'validate-ai:ratelimit',
    })
  : {
      limit: async () => ({
        success: true,
        limit: 10,
        remaining: 10,
        reset: Date.now() + 3600000,
      }),
    };

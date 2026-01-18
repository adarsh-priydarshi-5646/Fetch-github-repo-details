// API Configuration
export const API_TIMEOUT = 30000;
export const MAX_PRS_PER_PAGE = 100;
export const MAX_PAGES = 5;

// Cache Configuration
export const MAINTAINER_CACHE_TTL = 3600000; // 1 hour
export const GENERAL_CACHE_TTL = 300000; // 5 minutes

// Time Filters
export const TIME_FILTERS = {
  '2w': 14,
  '1m': 30,
  '3m': 90,
  '6m': 180,
  'all': null,
} as const;

// UI Configuration
export const DARK_MODE_KEY = 'darkMode';
export const TOKEN_NOTIFICATION_KEY = 'token_notification_seen';
export const GITHUB_TOKEN_KEY = 'github_token';

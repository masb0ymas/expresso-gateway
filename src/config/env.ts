import 'dotenv/config'

/**
 *
 * @param value
 * @param fallback
 * @returns
 */
function getEnv(value: any, fallback?: any): any {
  const result = process.env[value]

  // check env value
  if ([undefined, null, ''].includes(result)) {
    // check fallback
    if (fallback) {
      return fallback
    }

    return undefined
  }

  return result
}

/**
 * App Env
 */
const appEnv = {
  // Application
  NODE_ENV: getEnv('NODE_ENV', 'development'),

  APP_KEY: getEnv('APP_KEY'),
  APP_NAME: getEnv('APP_NAME', 'expresso'),
  APP_LANG: getEnv('APP_LANG', 'id'),
  APP_PORT: Number(getEnv('APP_PORT', 8000)),

  // Config
  AXIOS_TIMEOUT: getEnv('AXIOS_TIMEOUT', '5m'),
  RATE_LIMIT: Number(getEnv('RATE_LIMIT', 100)),
  RATE_DELAY: getEnv('RATE_DELAY', '5m'),
}

/**
 * Secret Env
 */
const secretEnv = {
  // OTP
  SECRET_OTP: getEnv('SECRET_OTP'),
  EXPIRED_OTP: getEnv('EXPIRED_OTP', '5m'),

  // JWT
  JWT_SECRET_ACCESS_TOKEN: getEnv('JWT_SECRET_ACCESS_TOKEN'),
  JWT_ACCESS_TOKEN_EXPIRED: getEnv('JWT_ACCESS_TOKEN_EXPIRED', '1d'),

  JWT_SECRET_REFRESH_TOKEN: getEnv('JWT_SECRET_REFRESH_TOKEN'),
  JWT_REFRESH_TOKEN_EXPIRED: getEnv('JWT_REFRESH_TOKEN_EXPIRED', '30d'),
}

/**
 * Base URL Env
 */
const baseURLEnv = {
  // Base URL
  URL_CLIENT_STAGING: getEnv(
    'URL_CLIENT_STAGING',
    'https://sandbox.example.com'
  ),
  URL_SERVER_STAGING: getEnv(
    'URL_SERVER_STAGING',
    'https://api-sandbox.example.com'
  ),

  URL_CLIENT_PRODUCTION: getEnv('URL_CLIENT_PRODUCTION', 'https://example.com'),
  URL_SERVER_PRODUCTION: getEnv(
    'URL_SERVER_PRODUCTION',
    'https://api.example.com'
  ),
}

/**
 * SMTP Env
 */
const mailEnv = {
  // default smtp
  MAIL_DRIVER: getEnv('MAIL_DRIVER', 'smtp'),
  MAIL_HOST: getEnv('MAIL_HOST', 'smtp.mailtrap.io'),
  MAIL_PORT: Number(getEnv('MAIL_PORT', 2525)),
  MAIL_AUTH_TYPE: getEnv('MAIL_AUTH_TYPE'),
  MAIL_USERNAME: getEnv('MAIL_USERNAME'),
  MAIL_PASSWORD: getEnv('MAIL_PASSWORD'),
  MAIL_ENCRYPTION: getEnv('MAIL_ENCRYPTION'),

  // mailgun smtp
  MAILGUN_API_KEY: getEnv('MAILGUN_API_KEY'),
  MAILGUN_DOMAIN: getEnv('MAILGUN_DOMAIN'),

  // google OAuth smtp
  OAUTH_CLIENT_ID: getEnv('OAUTH_CLIENT_ID'),
  OAUTH_CLIENT_SECRET: getEnv('OAUTH_CLIENT_SECRET'),
  OAUTH_REDIRECT_URL: getEnv('OAUTH_REDIRECT_URL'),
  OAUTH_REFRESH_TOKEN: getEnv('OAUTH_REFRESH_TOKEN'),
}

/**
 * Redis Env
 */
const redisEnv = {
  REDIS_HOST: getEnv('REDIS_HOST', '127.0.0.1'),
  REDIS_PORT: Number(getEnv('REDIS_PORT', 6379)),
  REDIS_PASSWORD: getEnv('REDIS_PASSWORD'),
}

/**
 * Third Party Env
 */
const thirdPartyEnv = {
  // open street map
  OPEN_STREET_MAP_URL: getEnv(
    'OPEN_STREET_MAP_URL',
    'https://nominatim.openstreetmap.org'
  ),

  // Telegram
  TELEGRAM_API_URL: getEnv('TELEGRAM_API_URL', 'https://api.telegram.org'),
  TELEGRAM_BOT_TOKEN: getEnv('TELEGRAM_BOT_TOKEN'),
  TELEGRAM_CHAT_ID: getEnv('TELEGRAM_CHAT_ID'),

  // Slack
  SLACK_API_URL: getEnv('SLACK_API_URL', 'https://slack.com/api'),
  SLACK_TOKEN: getEnv('SLACK_TOKEN'),
}

export const env = {
  ...appEnv,
  ...secretEnv,
  ...baseURLEnv,
  ...mailEnv,
  ...redisEnv,
  ...thirdPartyEnv,
}

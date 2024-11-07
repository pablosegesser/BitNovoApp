/**
 * These are configuration settings for the production environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  API_URL: "https://payments.pre-bnvo.com/api/v1",
  API_KEY: process.env.EXPO_PUBLIC_X_DEVICE_ID,
}

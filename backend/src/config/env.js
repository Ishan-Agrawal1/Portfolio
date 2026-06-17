import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
];

function validateEnv() {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    console.warn(
      `⚠️  Missing environment variables: ${missing.join(', ')}. 
       Falling back to mongodb://localhost:27017/portfolio. See .env.example for configuration.`
    );
  }
}

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || ['http://localhost:5173', 'http://localhost:5174'],
};

validateEnv();
export default config;

import 'dotenv/config';

export const app = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  storage: 'storage/',
};

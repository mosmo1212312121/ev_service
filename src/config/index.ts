import { config } from 'dotenv';

// config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
config({
  path: process.env.NODE_ENV === 'development' ? (process.env.NODE_ENV === 'development' ? '.env' : `.env.${process.env.NODE_ENV}`) : '.env',
});
console.log(process.env);

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;

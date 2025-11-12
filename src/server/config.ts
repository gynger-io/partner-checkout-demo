import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const IS_DEV = process.env.NODE_ENV !== 'production';

if (IS_DEV) {
  dotenv.config({ path: path.join(process.cwd(), '.env') });
}

const packageJsonPath = path.join(process.cwd(), 'package.json');
const rawPackageJson = fs.readFileSync(packageJsonPath).toString();
const PackageJson = JSON.parse(rawPackageJson);
const { version: VERSION } = PackageJson;

// server
const SERVER_PORT = process.env.PORT || 3003;

const GYNGER_API_KEY: string = process.env.GYNGER_API_KEY || 'sk_test_9f6cc520b5596cf8c1fcd6ab8137c13b';
const GYNGER_PUBLIC_KEY: string = process.env.GYNGER_PUBLIC_KEY || 'pk_test_27b46c134d60e2d001a4e95425db7f8c';
const NGROK_URL = process.env.NGROK_URL;
const GYNGER_API_URL = process.env.GYNGER_API_URL || 'https://staging.api.gynger.io';

// Local widget configuration
const IS_LOCAL = process.env.IS_LOCAL === 'true';
const LOCAL_WIDGET_PATH =
  process.env.LOCAL_WIDGET_PATH || path.join(process.cwd(), '..', 'gynger-checkout-widget', 'dist');

export {
  IS_DEV,
  VERSION,
  SERVER_PORT,
  GYNGER_API_KEY,
  GYNGER_PUBLIC_KEY,
  NGROK_URL,
  GYNGER_API_URL,
  IS_LOCAL,
  LOCAL_WIDGET_PATH,
};

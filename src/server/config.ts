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
const SERVER_PORT = process.env.PORT || 3000;

const GYNGER_API_KEY: string = process.env.GYNGER_API_KEY || 'sk_test_9f6cc520b5596cf8c1fcd6ab8137c13b';
const NGROK_URL = process.env.NGROK_URL;

export { IS_DEV, VERSION, SERVER_PORT, GYNGER_API_KEY, NGROK_URL };

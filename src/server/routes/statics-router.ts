import express, { Router } from 'express';
import path from 'path';
import { IS_LOCAL, LOCAL_WIDGET_PATH } from '../config';

export function staticsRouter(): Router {
  const router = Router();

  const staticsPath = path.join(process.cwd(), 'dist', 'client', 'assets');
  router.use('/assets', express.static(staticsPath));

  // Serve local gynger-checkout-widget bundle when IS_LOCAL is enabled
  if (IS_LOCAL) {
    console.log(`Serving local widget from: ${LOCAL_WIDGET_PATH}`);
    router.use('/local-widget', express.static(LOCAL_WIDGET_PATH));
  }

  return router;
}

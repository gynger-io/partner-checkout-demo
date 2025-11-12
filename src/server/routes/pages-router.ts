import { Router } from 'express';
import { getManifest } from './manifest-manager';
import { IS_DEV, IS_LOCAL, GYNGER_PUBLIC_KEY } from '../config';

export function pagesRouter(): Router {
  const router = Router();

  router.get(`/**`, async (_, res) => {
    const manifest = await getManifest();
    const renderData = { IS_DEV, IS_LOCAL, GYNGER_PUBLIC_KEY, manifest };
    res.render('page.ejs', renderData);
  });

  return router;
}

import bodyParser from 'body-parser';
import { Router } from 'express';
import {
  createDeal,
  deleteDeal,
  getAllDeals,
  getDealById,
  updateDealByAccountId,
  updateDealByOfferId,
  updateDealByToken,
} from '../db';
import { createCheckoutSession, updateOfferStatus, updateSessionStatus } from '../gynger-client';

export function apiRouter(): Router {
  const router = Router();
  router.use(bodyParser.json());

  router.get('/api/deals', async (req, res) => {
    const deals = await getAllDeals();
    res.json(deals);
  });

  router.put('/api/deals/checkout-status', async (req, res) => {
    const data = req.body;
    try {
      const session = await updateSessionStatus(data.sessionId, data.status);
      console.log(session);
      return res.json(session);
    } catch (error) {
      console.error('Got error updating checkout', (error as any).response?.data);
      res.sendStatus(400);
    }
  });

  router.put('/api/deals/offer-status', async (req, res) => {
    const data = req.body;
    try {
      const session = await updateOfferStatus(data.offerId, data.status);
      console.log(session);
      return res.json(session);
    } catch (error) {
      console.error('Got error updating offer', (error as any).response?.data);
      res.sendStatus(400);
    }
  });

  router.post('/api/deals', async (req, res) => {
    const data = req.body;
    try {
      const session = await createCheckoutSession(data);
      console.log(session);
      const deal = await createDeal({
        name: session.productDescription,
        amountPennies: session.amount,
        checkoutId: session.id,
        accountId: session.accountId,
        offerId: session.offerId,
        offerStatus: session.status,
      });
      return res.json(deal);
    } catch (error) {
      console.error(
        'Got error creating checkout',
        (error as any).response?.data,
        (error as any).response?.data?.details?.validationErrors,
      );
      res.sendStatus(400);
    }
  });

  router.get('/api/deal/:dealId', (req, res) => {
    const dealId = req.params.dealId;
    const deal = getDealById(parseInt(dealId, 10));
    if (!deal) {
      res.status(404).send(`Deal ${dealId} not found`);
      return;
    }
    res.json(deal);
  });

  router.delete('/api/deal/:dealId', async (req, res) => {
    const dealId = req.params.dealId;
    await deleteDeal(parseInt(dealId));
    res.status(200).send();
  });

  router.post('/webhooks', async (req, res) => {
    const data = req.body;
    console.log('Got webhook data', data);
    switch (data.type) {
      case 'checkout.session.status.updated':
        await updateDealByToken(data.data.id, {
          offerStatus: data.data.status,
          offerId: data.data.offerId,
          accountId: data.data.accountId,
        });
        break;
      case 'offer.status.updated':
        await updateDealByOfferId(data.data.gyngerId, {
          offerStatus: data.data.status,
          offerId: data.data.offerId,
          accountId: data.data.accountId,
        });
        break;
      case 'account.status.updated':
        await updateDealByAccountId(data.data.gyngerId, {
          accountStatus: data.data.status,
        });
    }
    res.send(`ok`);
  });

  router.post('/api/set-user', (req, res) => {
    res.send(`ok`);
  });

  return router;
}

import axios, { AxiosHeaders } from 'axios';
import { GYNGER_API_KEY } from './config';

const client = axios.create({
  headers: new AxiosHeaders({ authorization: GYNGER_API_KEY }),
});

export async function listWebhooks() {
  const result = await client.get('https://staging.api.gynger.io/v1/webhooks');
  return result.data;
}

export function deleteWebhooks(webhookId: string) {
  return client.delete(`https://staging.api.gynger.io/v1/webhooks/${webhookId}`);
}

export async function createWebhook() {
  const result = await client.post('https://staging.api.gynger.io/v1/webhooks', {
    url: `${process.env.NGROK_URL}/webhooks`,
    events: ['account.status.updated', 'offer.status.updated', 'checkout.session.status.updated'],
  });
  return result.data;
}

export async function createCheckoutSession(data: { amountDollars: number; productDescription: string }) {
  const result = await client.post('https://staging.api.gynger.io/v1/checkout/sessions', data);
  return result.data;
}

export async function updateSessionStatus(sessionId: string, status: string) {
  const result = await client.put(`https://staging.api.gynger.io/v1/sandbox/checkout/sessions/${sessionId}/status`, {
    status,
  });
  return result.data;
}

export async function updateOfferStatus(offerId: string, status: string) {
  const result = await client.put(`https://staging.api.gynger.io/v1/sandbox/offers/${offerId}/status`, {
    status,
  });
  return result.data;
}

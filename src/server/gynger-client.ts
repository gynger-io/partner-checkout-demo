import axios, { AxiosHeaders } from 'axios';
import { GYNGER_API_KEY, GYNGER_API_URL } from './config';

const baseUrl = GYNGER_API_URL;

const client = axios.create({
  headers: new AxiosHeaders({ authorization: GYNGER_API_KEY }),
});

export async function listWebhooks() {
  const result = await client.get(`${baseUrl}/v1/webhooks`);
  return result.data;
}

export function deleteWebhooks(webhookId: string) {
  return client.delete(`${baseUrl}/v1/webhooks/${webhookId}`);
}

export async function createWebhook() {
  const result = await client.post(`${baseUrl}/v1/webhooks`, {
    url: `${process.env.NGROK_URL}/webhooks`,
    events: ['account.status.updated', 'offer.status.updated', 'checkout.session.status.updated'],
  });
  return result.data;
}

export async function createCheckoutSession(data: { amountDollars: number; productDescription: string }) {
  const result = await client.post(`${baseUrl}/v1/checkout/sessions`, data);
  return result.data;
}

export async function updateSessionStatus(sessionId: string, status: string) {
  const result = await client.put(`${baseUrl}/v1/sandbox/checkout/sessions/${sessionId}/status`, {
    status,
  });
  return result.data;
}

export async function updateOfferStatus(offerId: string, status: string) {
  const result = await client.put(`${baseUrl}/v1/sandbox/offers/${offerId}/status`, {
    status,
  });
  return result.data;
}

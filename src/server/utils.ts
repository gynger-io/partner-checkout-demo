import { NGROK_URL } from './config';
import { deleteWebhooks, listWebhooks, createWebhook } from './gynger-client';

export async function createWebhooks() {
  if (NGROK_URL) {
    try {
      const webhooks = await listWebhooks();
      console.log('Got webhooks', webhooks);
      await Promise.all(webhooks.map((hook: any) => deleteWebhooks(hook.gyngerId)));
      const created = await createWebhook();
      console.log('created webhhook', created);
    } catch (error: any) {
      console.error(
        'Got Error creating webhooks',
        error.response?.data,
        error.response?.data?.details?.validationErrors,
      );
    }
  }
}

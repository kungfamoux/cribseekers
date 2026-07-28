import apiClient from './axios';
import { WebhookResponse, PaystackWebhookPayload, FlutterwaveWebhookPayload } from '../../types/webhook.types';

export const webhookService = {
  // Handle Paystack webhook
  handlePaystackWebhook: async (
    payload: PaystackWebhookPayload,
    signature: string,
  ): Promise<WebhookResponse> => {
    const response = await apiClient.post(
      '/webhooks/paystack',
      payload,
      {
        headers: {
          'x-paystack-signature': signature,
        },
      },
    );
    return response.data;
  },

  // Handle Flutterwave webhook
  handleFlutterwaveWebhook: async (
    payload: FlutterwaveWebhookPayload,
    signature: string,
  ): Promise<WebhookResponse> => {
    const response = await apiClient.post(
      '/webhooks/flutterwave',
      payload,
      {
        headers: {
          'verif-hash': signature,
        },
      },
    );
    return response.data;
  },
};

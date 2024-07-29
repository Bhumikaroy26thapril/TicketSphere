import axios from 'axios';
import { razorpayConfig } from '../config/razorpayConfig';

const api = axios.create({
  baseURL: 'YOUR_BACKEND_API_URL',
});

export const createOrder = async (amount, currency = 'INR') => {
  try {
    const response = await api.post('/create-order', {
      amount,
      currency,
      key_id: razorpayConfig.key_id,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order', error.message);
    throw error;
  }
};

export const verifyPayment = async (payment_id, order_id, signature) => {
  try {
    const response = await api.post('/verify-payment', {
      payment_id,
      order_id,
      signature,
      key_secret: razorpayConfig.key_secret,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying payment', error.message);
    throw error;
  }
};

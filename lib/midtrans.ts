import axios from 'axios';
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const baseUrl = MIDTRANS_IS_PRODUCTION ? 'https://api.midtrans.com/v2' : 'https://api.sandbox.midtrans.com/v2';

export async function createCharge(orderId, grossAmount, customer) {
  const payload = {
    payment_type: 'bank_transfer',
    transaction_details: { order_id: orderId, gross_amount: grossAmount },
    customer_details: { first_name: customer.name || 'Warga', email: customer.email, phone: customer.phone }
  };
  const auth = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64');
  const res = await axios.post(`${baseUrl}/charge`, payload, { headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' } });
  return res.data;
}

export async function getStatus(orderId) {
  const auth = Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64');
  const res = await axios.get(`${baseUrl}/${orderId}/status`, { headers: { Authorization: `Basic ${auth}` } });
  return res.data;
}

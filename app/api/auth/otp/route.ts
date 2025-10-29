import { NextResponse } from 'next/server';
import axios from 'axios';
import { supabaseAdmin } from '../../../../lib/supabaseClient';

export async function POST(req) {
  const { phone, email, method } = await req.json();
  // method: 'whatsapp' or 'email'
  // generate OTP (6 digits) and store in a temporary table or send via your provider
  const otp = Math.floor(100000 + Math.random()*900000).toString();
  // Store OTP in a table or cache (left as exercise)
  if(method === 'whatsapp') {
    // Send via WhatsApp Cloud API - stub
    const token = process.env.WHATSAPP_API_TOKEN;
    if(!token) return NextResponse.json({ error: 'WHATSAPP_API_TOKEN not configured' }, { status: 500 });
    try {
      await axios.post(`https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages`, {
        messaging_product: 'whatsapp',
        to: phone,
        text: { body: `Kode OTP RumahKita: ${otp}` }
      }, { headers: { Authorization: `Bearer ${token}` } });
      return NextResponse.json({ ok: true });
    } catch(e){
      return NextResponse.json({ error: e.message }, { status:500 });
    }
  } else {
    // send via email - integrate with SendGrid/Mailgun (stub)
    return NextResponse.json({ ok: true, otp });
  }
}

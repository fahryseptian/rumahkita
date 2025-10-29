import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabaseClient';
import { createCharge } from '../../../lib/midtrans';

export async function POST(req) {
  const body = await req.json();
  const { tenantId, type, payload } = body;
  // type: 'tagihan' or 'transaction'
  try {
    if(type === 'tagihan') {
      const { tagihanId } = payload;
      const { data: tagihan } = await supabaseAdmin.from('tagihan').select('*').eq('id', tagihanId).single();
      if(!tagihan) return NextResponse.json({ error: 'tagihan not found' }, { status: 404 });
      const orderId = `RK-TAG-${tagihan.id}-${Date.now()}`;
      const charge = await createCharge(orderId, Number(tagihan.jumlah), { email: 'noreply@rumahkita.local' });
      await supabaseAdmin.from('pembayaran').insert({ tenant_id: tagihan.tenant_id, tagihan_id: tagihan.id, metode: 'midtrans', amount: tagihan.jumlah, status: 'pending', midtrans_order_id: orderId });
      return NextResponse.json({ charge });
    } else {
      const orderId = `RK-TRX-${Date.now()}`;
      const charge = await createCharge(orderId, Number(payload.amount), { name: payload.name, email: payload.email, phone: payload.phone });
      await supabaseAdmin.from('tenant_billing_history').insert({ tenant_id: tenantId, amount: payload.amount, status: 'pending', midtrans_order_id: orderId });
      return NextResponse.json({ charge });
    }
  } catch(e) {
    return NextResponse.json({ error: e.message || e }, { status: 500 });
  }
}

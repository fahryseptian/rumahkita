import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseClient';

export async function POST(req) {
  const body = await req.json();
  const { order_id, transaction_status } = body;
  try {
    // handle tagihan or transaction
    if(order_id.startsWith('RK-TAG-')){
      const parts = order_id.split('-');
      const tagId = parts[2];
      if(['capture','settlement','success'].includes(transaction_status)){
        await supabaseAdmin.from('pembayaran').update({ status: 'success', tanggal: new Date().toISOString() }).eq('tagihan_id', tagId);
        await supabaseAdmin.from('tagihan').update({ status: 'lunas' }).eq('id', tagId);
      } else {
        await supabaseAdmin.from('pembayaran').update({ status: 'failed' }).eq('tagihan_id', tagId);
      }
    } else if(order_id.startsWith('RK-TRX-')){
      // update tenant billing history
      if(['capture','settlement','success'].includes(transaction_status)){
        await supabaseAdmin.from('tenant_billing_history').update({ status: 'success' }).eq('midtrans_order_id', order_id);
      } else {
        await supabaseAdmin.from('tenant_billing_history').update({ status: 'failed' }).eq('midtrans_order_id', order_id);
      }
    }
    return NextResponse.json({ ok: true });
  } catch(e){
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

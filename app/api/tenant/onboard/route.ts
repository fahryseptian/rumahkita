import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabaseClient';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, slug, owner_email } = body;
    // create tenant
    const { data, error } = await supabaseAdmin.from('tenants').insert({ name, slug }).select().single();
    if(error) return NextResponse.json({ error }, { status: 500 });
    // create user record (owner)
    const { data: user } = await supabaseAdmin.from('users').insert({ email: owner_email, role: 'owner', tenant_id: data.id }).select().single();
    return NextResponse.json({ ok: true, tenant: data, owner: user });
  } catch(e){
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

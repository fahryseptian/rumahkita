import { supabaseAdmin } from './supabaseClient';

export async function getTenantBySlug(slug) {
  const { data, error } = await supabaseAdmin.from('tenants').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data;
}

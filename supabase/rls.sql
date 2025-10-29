-- Example RLS policies for tenant isolation. Adapt to your auth claims setup.
-- Enable RLS on sensitive tables
alter table tagihan enable row level security;
alter table rumah enable row level security;
alter table laporan enable row level security;
alter table sos enable row level security;
alter table pembayaran enable row level security;

-- Policy: allow select/insert/update by users of same tenant (supabase JWT must include tenant_id claim)
create policy "select_tagihan_by_tenant" on tagihan for select using (tenant_id = current_setting('jwt.claims.tenant_id')::uuid);
create policy "insert_tagihan_by_tenant" on tagihan for insert with check (tenant_id = current_setting('jwt.claims.tenant_id')::uuid);

-- If you don't use tenant_id JWT claims, use server-side functions that set the tenant context or always perform admin-side checks.

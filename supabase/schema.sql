-- Production schema for RumahKita (multi-tenant)
create extension if not exists "uuid-ossp";

-- Tenants
create table tenants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  subdomain text unique,
  owner_user_id uuid,
  plan text default 'starter',
  billing_customer_id text,
  created_at timestamptz default now()
);

-- Users
create table users (
  id uuid primary key default uuid_generate_v4(),
  supabase_user_id text, -- maps to auth.users.id
  name text,
  email text,
  phone text,
  role text check (role in ('admin','warga','security','owner')) default 'warga',
  tenant_id uuid references tenants(id),
  rumah_id bigint,
  created_at timestamptz default now()
);

-- Rumah
create table rumah (
  id bigserial primary key,
  tenant_id uuid references tenants(id),
  blok text,
  nomor text,
  status text default 'aktif'
);

-- Tagihan (invoices)
create table tagihan (
  id bigserial primary key,
  tenant_id uuid references tenants(id),
  rumah_id bigint references rumah(id),
  bulan date,
  keterangan text,
  jumlah numeric(12,2),
  status text default 'belum_lunas',
  created_at timestamptz default now()
);

-- Pembayaran history
create table pembayaran (
  id bigserial primary key,
  tenant_id uuid references tenants(id),
  tagihan_id bigint references tagihan(id),
  metode text,
  amount numeric,
  tanggal timestamptz,
  bukti_url text,
  status text,
  midtrans_order_id text
);

-- Laporan
create table laporan (
  id bigserial primary key,
  tenant_id uuid references tenants(id),
  user_id uuid references users(id),
  kategori text,
  deskripsi text,
  foto_url text,
  status text default 'baru',
  created_at timestamptz default now()
);

-- SOS logs
create table sos (
  id bigserial primary key,
  tenant_id uuid references tenants(id),
  user_id uuid references users(id),
  pesan text,
  waktu timestamptz default now(),
  status text default 'baru'
);

-- tenant billing history
create table tenant_billing_history (
  id bigserial primary key,
  tenant_id uuid references tenants(id),
  amount numeric,
  status text,
  midtrans_order_id text,
  created_at timestamptz default now()
);

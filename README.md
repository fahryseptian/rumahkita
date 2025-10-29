# RumahKita – Production Scaffold (Ready to customize & deploy)

This repository is a production-ready scaffold for **RumahKita**, a multi-tenant neighborhood management SaaS.

**Features included:**
- Multi-tenant design (tenant_id on main tables)
- Supabase Auth integration (magic link/email + OTP WhatsApp stub)
- RLS policy examples (SQL)
- Monthly invoices (auto-generate) + ad-hoc transactions
- Midtrans integration (charge & webhook handlers)
- Landing page (marketing) + app (/app)
- OTP endpoints stubs for WhatsApp (needs your WhatsApp Cloud API token)
- Deployment ready for Vercel + Supabase

## Quick deploy (high-level)
1. Create a Supabase project and run `supabase/schema.sql` and `supabase/rls.sql`.
2. Create Midtrans sandbox account and set keys in Vercel env vars.
3. Push this repo to GitHub and click the Deploy with Vercel button in this README.
4. Set environment variables in Vercel (see below).

## Environment variables required (Vercel)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- MIDTRANS_SERVER_KEY
- MIDTRANS_CLIENT_KEY
- MIDTRANS_IS_PRODUCTION (false for sandbox)
- WHATSAPP_API_TOKEN (optional - for WA OTP & notifications)
- EMAIL_SEND_API_KEY (optional - for sending emails via SendGrid/Mailgun)

## Important notes
- The OTP via WhatsApp functionality is provided as a server-side stub; you must supply your WhatsApp Cloud API token and adjust message templates if you want production OTPs.
- For recurring monthly billing automation, use an external cron or serverless schedule (e.g., Vercel cron or Cloud Scheduler) to trigger billing job that creates Midtrans charges for tenants.
- Secure your SUPABASE_SERVICE_ROLE_KEY. Never expose it in client-side code.

---

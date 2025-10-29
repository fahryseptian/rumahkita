import { NextResponse } from 'next/server';

export async function middleware(req) {
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0];
  const apex = 'rumahkita.vercel.app'; // replace with your domain if custom
  let tenantSlug = null;
  if(hostname !== apex && hostname.endsWith(`.${apex}`)) {
    tenantSlug = hostname.replace(`.${apex}`, '');
  }
  const res = NextResponse.next();
  res.headers.set('x-tenant-slug', tenantSlug || 'public');
  return res;
}

export const config = { matcher: ['/((?!_next).*)'] };

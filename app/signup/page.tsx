'use client';
import { useState } from 'react';
export default function SignupPage(){
  const [name,setName]=useState(''); const [slug,setSlug]=useState(''); const [email,setEmail]=useState('');
  const submit = async (e)=>{ e.preventDefault(); alert('Onboarding request submitted (demo scaffold)'); };
  return (
    <div style={{maxWidth:640, margin:'24px auto', background:'#fff', padding:16, borderRadius:8}}>
      <h2>Daftar RT / Cluster</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8}}>
        <input placeholder='Nama RT / Cluster' value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder='Slug (cth: rt03-mawar)' value={slug} onChange={e=>setSlug(e.target.value)} />
        <input placeholder='Email Pemilik' value={email} onChange={e=>setEmail(e.target.value)} />
        <button style={{background:'#2563EB', color:'#fff', padding:8, borderRadius:6}}>Daftar</button>
      </form>
    </div>
  )
}

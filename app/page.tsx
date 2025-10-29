import Link from 'next/link';

export default function Page(){
  return (
    <div style={{textAlign:'center'}}>
      <section style={{background:'linear-gradient(90deg,#2563EB,#F97316)', color:'#fff', padding:'48px 16px', borderRadius:8}}>
        <h1 style={{fontSize:36, marginBottom:12}}>RumahKita — Kelola RT & Cluster secara Online</h1>
        <p style={{fontSize:18, maxWidth:800, margin:'0 auto 18px'}}>Tagihan otomatis, WhatsApp OTP, pembayaran Midtrans, dan tombol darurat — untuk pengurus RT yang ingin digital.</p>
        <div style={{display:'flex', gap:12, justifyContent:'center'}}>
          <a href="/app"><button style={{background:'#fff', color:'#2563EB', padding:'10px 18px', borderRadius:999}}>Masuk / Coba Demo</button></a>
          <a href="/signup"><button style={{background:'#F97316', color:'#fff', padding:'10px 18px', borderRadius:999}}>Daftar RT</button></a>
        </div>
      </section>
    </div>
  )
}

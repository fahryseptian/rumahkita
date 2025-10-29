import { DEMO_DATA } from '../../demo.config.js';

export default function AppDashboard(){
  const data = DEMO_DATA;
  const totalTagihan = data.tagihan.reduce((a,b)=>a+b.jumlah,0);
  return (
    <div>
      <h1 style={{fontSize:24, fontWeight:700}}>Dashboard - {data.tenant.name}</h1>
      <div style={{display:'flex', gap:12, marginTop:12}}>
        <div style={{padding:12, background:'#fff', borderRadius:8}}>🏘️ Rumah Aktif: {data.rumah.length}</div>
        <div style={{padding:12, background:'#fff', borderRadius:8}}>💰 Total Tagihan: Rp {totalTagihan.toLocaleString()}</div>
        <div style={{padding:12, background:'#fff', borderRadius:8}}>📋 Laporan Baru: {data.laporan.length}</div>
      </div>
    </div>
  );
}

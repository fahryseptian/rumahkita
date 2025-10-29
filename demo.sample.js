export const DEMO_DATA = {
  tenant: { name: "RT 03 Cluster Mawar", slug: "rt03-mawar" },
  rumah: [
    { id: 1, blok: "A1", nomor: "01", status: "Aktif" },
    { id: 2, blok: "A2", nomor: "02", status: "Aktif" },
    { id: 3, blok: "A3", nomor: "03", status: "Aktif" }
  ],
  warga: [
    { id: "admin-demo", nama: "Admin Demo", email: "admin@demo.rumahkita", role: "admin", rumah: "A1" },
    { id: "budi-demo", nama: "Budi", email: "budi@demo.rumahkita", role: "warga", rumah: "A2" }
  ],
  tagihan: [
    { id: 1, keterangan: "Iuran Keamanan", bulan: "2025-10-01", jumlah: 150000, status: "Belum Lunas" },
    { id: 2, keterangan: "Iuran Kebersihan", bulan: "2025-10-01", jumlah: 50000, status: "Lunas" }
  ],
  laporan: [], sos: []
};

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Animasi fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in-up").forEach((el) => {
      observer.observe(el);
    });

    // Set tahun di footer
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
  }, []);

  return (
    <main className="text-gray-700 font-[Inter] bg-gray-50 scroll-smooth">
      {/* Navbar */}
      <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-md shadow-gray-200/50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="#" className="text-3xl font-bold text-blue-700">
            QPOS
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#fitur" className="nav-link">
              Fitur
            </a>
            <a href="#audiens" className="nav-link">
              Untuk Siapa
            </a>
            <a href="#harga" className="nav-link">
              Harga
            </a>
            <a href="#faq" className="nav-link">
              FAQ
            </a>
          </div>
          <a
            href="https://shopee.co.id"
            target="_blank"
            className="shopee-btn text-white font-bold py-2.5 px-6 rounded-xl"
          >
            Dapatkan di Shopee
          </a>
        </nav>
      </header>
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="container mx-auto px-6 pt-24 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 fade-in-up">
            QPOS: Aplikasi Kasir dan <br /> Manajemen Bisnis All-in-One Anda
          </h1>
          <p
            className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto mb-10 fade-in-up"
            style={{ transitionDelay: "150ms" }}
          >
            Kelola penjualan, inventaris, pelanggan, dan keuangan dari satu
            aplikasi canggih yang dirancang untuk kafe, restoran, toko ritel,
            dan bisnis jasa.
          </p>
          <a
            href="https://shopee.co.id"
            target="_blank"
            className="shopee-btn text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-2xl fade-in-up"
            style={{ transitionDelay: "300ms" }}
          >
            Dapatkan QPOS Sekarang
          </a>

          <div
            className="mt-20 mx-auto max-w-5xl p-2 bg-gray-900/20 rounded-xl fade-in-up"
            style={{ transitionDelay: "450ms" }}
          >
            <Image
              src="/order.png"
              alt="Tangkapan Layar Aplikasi QPOS"
              width={1200}
              height={800}
              className="rounded-lg shadow-2xl border-4 border-gray-600/50"
            />
          </div>
        </div>
      </section>
      {/* Karena HTML-nya panjang, kamu tinggal copy setiap section ke sini */}
      {/* Cukup ubah tag <img> → <Image src="/..." width height /> */}
      {/* dan <a href> → <Link href> jika internal */}
      <section id="fitur" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 fade-in-up">
              Kenapa Memilih QPOS?
            </h2>
            <p
              className="text-lg text-gray-600 max-w-3xl mx-auto fade-in-up"
              style={{ transitionDelay: "150ms" }}
            >
              Fokus pada manfaat bisnis dengan fungsionalitas inti yang
              dirancang untuk pertumbuhan dan efisiensi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 fade-in-up">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Manajemen Pesanan Lengkap
              </h3>
              <p>
                Proses pesanan secara efisien dengan kategori menu, pembaruan
                keranjang real-time, dan opsi pembayaran tunai maupun digital.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 fade-in-up"
              style={{ transitionDelay: "100ms" }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Kontrol Inventaris Cerdas
              </h3>
              <p>
                Lacak stok dengan analisis HPP vs harga jual. Pantau margin
                keuntungan dan item paling profitabel Anda.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 fade-in-up"
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Manajemen Pelanggan (CRM)
              </h3>
              <p>
                Simpan info pelanggan, lacak riwayat belanja, dan tawarkan
                pembayaran fleksibel dengan sistem utang "Bayar Nanti".
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 fade-in-up"
              style={{ transitionDelay: "300ms" }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Pelacakan Keuangan Lengkap
              </h3>
              <p>
                Sistem dompet internal melacak pendapatan, pengeluaran, dan arus
                kas. Hasilkan laporan laba rugi detail.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 fade-in-up">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Laporan & Analitik Canggih
              </h3>
              <p>
                Pahami bisnis Anda dengan laporan penjualan, performa menu, dan
                wawasan berbasis kategori transaksi.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 fade-in-up"
              style={{ transitionDelay: "100ms" }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Cetak Struk Thermal
              </h3>
              <p>
                Hasilkan struk profesional dengan logo dan watermark. Kompatibel
                dengan printer thermal untuk operasi yang lancar.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 fade-in-up"
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Dukungan Multi-Bahasa
              </h3>
              <p>
                Tersedia dalam Bahasa Inggris dan Bahasa Indonesia untuk
                melayani kebutuhan bisnis yang beragam di berbagai wilayah.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 fade-in-up"
              style={{ transitionDelay: "300ms" }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Bekerja Offline
              </h3>
              <p>Tetap beroperasi bahkan tanpa internet.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="audiens" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 fade-in-up">
              Sempurna Untuk Bisnis Apapun
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto fade-in-up"
              style={{ transitionDelay: "150ms" }}
            >
              Dari kuliner hingga jasa, QPOS adalah solusi yang fleksibel dan
              tepat untuk Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200 fade-in-up">
              <h3 className="font-bold text-2xl text-gray-800 mb-2">
                Bisnis F&B
              </h3>
              <p>Kafe, restoran, warung, food truck, toko roti.</p>
            </div>
            <div
              className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200 fade-in-up"
              style={{ transitionDelay: "100ms" }}
            >
              <h3 className="font-bold text-2xl text-gray-800 mb-2">
                Toko Ritel
              </h3>
              <p>Butik, toko kelontong, toko elektronik, toko buku.</p>
            </div>
            <div
              className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200 fade-in-up"
              style={{ transitionDelay: "200ms" }}
            >
              <h3 className="font-bold text-2xl text-gray-800 mb-2">
                Bisnis Jasa
              </h3>
              <p>Barbershop, salon, laundry, bengkel, servis.</p>
            </div>
            <div
              className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200 fade-in-up"
              style={{ transitionDelay: "300ms" }}
            >
              <h3 className="font-bold text-2xl text-gray-800 mb-2">
                UMKM & Usaha Lain
              </h3>
              <p>
                Semua bisnis yang butuh POS lengkap dengan manajemen keuangan.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="demo" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 fade-in-up">
              Lihat QPOS Beraksi
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto fade-in-up"
              style={{ transitionDelay: "150ms" }}
            >
              Jelajahi antarmuka yang intuitif dan mudah digunakan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="fade-in-up">
              <img
                src="../public/order.png"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div className="fade-in-up" style={{ transitionDelay: "150ms" }}>
              <img
                src="../public/home.png"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div className="fade-in-up" style={{ transitionDelay: "300ms" }}>
              <img
                src="../public/menu_report.png"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 fade-in-up">
              Dipercaya oleh Para Pebisnis
            </h2>
            <p
              className="text-lg text-gray-600 max-w-2xl mx-auto fade-in-up"
              style={{ transitionDelay: "150ms" }}
            >
              Lihat bagaimana QPOS membantu mereka bertumbuh.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 fade-in-up">
            <p className="text-xl text-center text-gray-700 italic mb-8">
              "QPOS telah merevolusi cara saya mengelola kedai kopi. Fitur
              pelacakan laba membantu saya memahami menu mana yang paling
              menguntungkan, dan sistem utang pelanggan telah meningkatkan arus
              kas saya secara signifikan!"
            </p>
            <div className="flex items-center justify-center">
              <img
                className="w-16 h-16 rounded-xl mr-4 border-2 border-blue-200"
                src="https://placehold.co/100x100/e0f2fe/0c4a6e?text=S"
                alt="Avatar Sarah"
              />
              <div>
                <p className="font-bold text-xl text-gray-800">Sarah</p>
                <p className="text-gray-500">Pemilik, Kopi Nusantara Cafe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="harga" className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 fade-in-up">
            Beli Sekali, Pakai Selamanya
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-16 fade-in-up"
            style={{ transitionDelay: "150ms" }}
          >
            Satu kali bayar untuk akses aplikasi penuh, semua fitur, dan
            pembaruan gratis. Tanpa biaya bulanan tersembunyi.
          </p>
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-10 border border-gray-200 transform hover:scale-105 transition-transform duration-300 fade-in-up">
            <h3 className="text-3xl font-bold text-blue-700 mb-2">QPOS Pro</h3>
            <p className="text-6xl font-extrabold text-gray-800 mb-4">
              Rp 259.000
            </p>
            <p className="text-gray-500 mb-8 font-medium">
              LISENSI SEUMUR HIDUP
            </p>
            <ul className="text-left space-y-4 mb-10 text-lg">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Akses Penuh Semua Fitur
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Pembaruan Aplikasi Gratis
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Dukungan Pelanggan Prioritas
              </li>
            </ul>
            <a
              href="https://shopee.co.id"
              target="_blank"
              className="w-full shopee-btn text-white font-bold py-4 px-8 rounded-xl text-xl transition-all"
            >
              Beli Sekarang
            </a>
          </div>
          <div className="mt-12 fade-in-up">
            <p className="text-gray-600">
              Butuh solusi khusus atau lisensi dalam jumlah besar?
              <a
                href="https://wa.me/6281936242236"
                className="text-blue-600 font-semibold hover:underline"
              >
                Hubungi Tim Enterprise kami.
              </a>
            </p>
          </div>
        </div>
      </section>
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 fade-in-up">
            Pertanyaan Umum
          </h2>
          <div
            className="space-y-4 fade-in-up"
            style={{ transitionDelay: "150ms" }}
          >
            <details className="faq-item bg-white p-6 rounded-xl border border-gray-200 transition-all">
              <summary className="font-semibold text-lg text-gray-800 cursor-pointer flex justify-between items-center">
                Perangkat apa yang didukung QPOS?
                <svg
                  className="w-5 h-5 transition-transform transform details-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </summary>
              <p className="text-gray-600 pt-4 mt-4 border-t border-gray-200">
                QPOS saat ini mendukung semua perangkat smartphone dan tablet
                yang menggunakan sistem operasi Android.
              </p>
            </details>
            <details className="faq-item bg-white p-6 rounded-xl border border-gray-200 transition-all">
              <summary className="font-semibold text-lg text-gray-800 cursor-pointer flex justify-between items-center">
                Apakah saya perlu koneksi internet?
                <svg
                  className="w-5 h-5 transition-transform transform details-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </summary>
              <p className="text-gray-600 pt-4 mt-4 border-t border-gray-200">
                Tidak selalu. QPOS dirancang untuk bekerja secara offline. Anda
                dapat terus melakukan transaksi, dan data akan tersinkronisasi
                secara otomatis saat perangkat Anda kembali terhubung ke
                internet.
              </p>
            </details>
            <details className="faq-item bg-white p-6 rounded-xl border border-gray-200 transition-all">
              <summary className="font-semibold text-lg text-gray-800 cursor-pointer flex justify-between items-center">
                Bisakah saya mengekspor data saya?
                <svg
                  className="w-5 h-5 transition-transform transform details-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </summary>
              <p className="text-gray-600 pt-4 mt-4 border-t border-gray-200">
                Ya, Anda dapat mengekspor laporan keuangan dan data penjualan
                Anda ke dalam format PDF atau CSV untuk keperluan akuntansi atau
                analisis lebih lanjut.
              </p>
            </details>
            <details className="faq-item bg-white p-6 rounded-xl border border-gray-200 transition-all">
              <summary className="font-semibold text-lg text-gray-800 cursor-pointer flex justify-between items-center">
                Bagaimana cara mendapatkan dukungan teknis?
                <svg
                  className="w-5 h-5 transition-transform transform details-arrow"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </summary>
              <p className="text-gray-600 pt-4 mt-4 border-t border-gray-200">
                Kami menyediakan dukungan pelanggan prioritas melalui Email dan
                WhatsApp. Tim kami siap membantu Anda dengan pertanyaan atau
                masalah apa pun yang Anda hadapi.
              </p>
            </details>
          </div>
        </div>
      </section>
      <section className="cta-gradient text-white">
        <div className="container mx-auto px-6 py-20 text-center fade-in-up">
          <h2 className="text-4xl font-bold mb-4">
            Siap Mengembangkan Bisnis Anda?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Bergabunglah dengan ratusan pengusaha lain yang telah memodernkan
            bisnisnya bersama QPOS.
          </p>
          <a
            href="https://shopee.co.id"
            target="_blank"
            className="shopee-btn text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-2xl"
          >
            Beli QPOS Sekarang
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <Link
                href="#"
                className="text-3xl font-bold text-white mb-4 inline-block"
              >
                QPOS
              </Link>
              <p className="text-gray-400 max-w-md">
                Memberdayakan UMKM di Sukabumi dan seluruh Indonesia dengan
                teknologi yang mudah diakses.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Tautan Cepat</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Panduan Pengguna
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Syarat & Ketentuan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://wa.me/6281936242236"
                    className="text-gray-400 hover:text-white"
                  >
                    WhatsApp Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-500 border-t border-gray-700 mt-10 pt-6">
            <p>
              &copy; <span id="year"></span> QPOS. Seluruh Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

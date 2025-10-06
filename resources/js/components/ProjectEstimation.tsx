import React, { useEffect, useState } from 'react';

const formatTwoDigits = (n: number): string => n.toString().padStart(2, '0');

const pbgItems = [
    'Form Permohonan PBG',
    'Dokumen KKPR/KRK',
    'Gambar Arsitektur yang telah disahkan',
    'Gambar Struktur yang telah disahkan',
    'Gambar ME (Mechanical Electrical) yang telah disahkan',
    'Perhitungan Struktur Bangunan',
    'Dokumen Lingkungan (UKL/UPL/SPPL)',
    'Bukti Pembayaran Retribusi PBG',
    'Dokumen Kepemilikan Tanah/Bangunan (SHM/SHGB/dll)',
    'Izin Lokasi/Advice Planning',
    'Surat Keterangan Domisili',
    'Site Plan',
    'Denah',
    'Potongan',
    'Tampak',
    'Detail Konstruksi',
    'Drawing Penangkal Petir (Detail)',
    'Drawing Instalasi Listrik (SLD) (Detail)',
    'Drawing Instalasi Air Bersih/Kotor (Detail)',
    'Dokumen Damkar (Sistem Proteksi Kebakaran)',
];

const slfItems = [
    'Surat Permohonan SLF dan Data Umum Bangunan Gedung',
    'Surat Pernyataan Laik Fungsi Dari Konsultan Pengkaji teknis Di Tanda Tangan Basah dan bermaterai oleh Direktur Konsultan Pengkaji Teknis dan Seluruh Tenaga Ahli Bersertifikat',
    'Surat Pernyataan Laik Fungsi Bertandatangan Basah dan bermaterai Oleh Pemilik Bangunan',
    'Surat Keabsahan Dokumen dari pengkaji teknis bertandatangan Basah Dan bermaterai',
    'Surat Keabsahan Dokumen Dari pemohon atau penmilik bangunan Gedung di tanda tangan Basah Dan bermaterai',
    'Foto Copy KTP / Kitas Pemohon',
    'Foto Copy NPWP',
    'Persetujuan Bangunan Gedung (PBG) disertai bukti bayar retribusi / Izin Mendirikan Bangunan (IMB) beserta gambar yang telah di sahkan oleh pejabat Berweenang',
    'Gambar Rencana Tapak / Site Plan yang telah disahkan oleh Pemda / Kawasan + SK Siteplan',
    'Dokumen KRK / KKPR/ IPPT/ Advice Planing',
    'Akta Perusahaan dan Perubahannya',
    'Dokmumen Status Hak atas Tanah / Kepemilikan Bangunan Gedung (SHM, SHGB, Perjanjian Jual Beli, Perjanjian Sewa menyewa, dll)',
    'Surat Perijinan Pemanfaatan Atau Izin Pemanfaatan atau penggunaan Tanah, Apabila Pemilik Bangunan Gedung Bukan Pemegang Hak Atas Tanah',
    'Dokumen Lingkungan : AMDAL/UKL-UPL/RKL-RPL/SPPL/AMDAL/ dari Dinas Lingkungan Hidup/Izin Lokasi.',
    'Dokumen Lingkungan : ANDAL LALIN',
    'Dokumen Lingkungan : SIPA *jika pakai sumur bor/Tanah*',
    'Dokumen Lingkungan : Hasil Laboratorium Air Bersih',
    'Dokumen Lingkungan : Hasil Laboratorium Air Kotor',
    'Rekomendasi : Bejana Tekan dari Dinas Tenaga Kerja',
    'Rekomendasi : Penangkalan Petir Dinas Tenaga Kerja',
    'Rekomendasi : Alat Angkut Dari Dinas Tenaga Kerja',
    'Rekomendasi : Genset dari Dinas Tenaga Kerja',
    'Rekomendasi : K3 Umum dari Dinas Tenaga Kerja',
    'Rekomendasi : SLO Instalasi Listrik TM dari ESDM',
    'Rekomendasi : SLO Genset dari ESDM ( apabila diatas 500kVa)',
    'Dokumen Damkar : Dokumen Laik Pakai Sistem Proteksi Kebakaran dari Dinas Pemadam kebakaran/SKK/RKK Damkar + Suket',
    'Dokumen Damkar : Struktur Organisasi Penanggulangan Kebakaran P2K3',
    'Dokumen Damkar : SOP Penanggulangan Bencana Kebakaran',
    'Surat Keterangan Domisili Usaha ( jika belum memiliki NIB )',
    'Perhitungan Perencanaan Struktur atas dan bawah',
    'data-data perusahaan : Tanda Daftar Perusahaan',
    'data-data perusahaan : SIUP',
    'data-data perusahaan : NIB',
    'data-data perusahaan : Izin Usaha',
    'Data Tenaga Ahli Pengkaji Teknis bersertifikat, (SBU Konsultan Pengkaji Teknis, NPWP, Perusahaan konsultan Pengkaji teknis, KTP direktur, SKA & KTP Tenaga Ahli Pengkaji Teknis)',
    'Dokumen Pengkaji Teknis Bangunan Gedung. Hasil Pemeriksaan Kualitas bangunan atau pengkaji teknis dari penyedia jasa atau konsultan Pengkaji teknis bangunan gedung yang meliputi aspek keselamatan, kesehatan, kenyamanan, dan kemudahan',
    'Dokumen SLF Terakhir Beserta Lampirannya (Jika sudah memiliki SLF)',
    'Surat kerukunan umat beragama (SKUB) untuk fungsi keagamaan dan surat keterangan dari kantor Wilayah Kementrian Agama (Dalam Hal bangunan adalah Fungsi Keagamaan)',
    'Surat Komitmen Kesanggupan Perbaikan (Mayor / Minor) Bangunan Gedung. *disi Setelah dilakukan konsultasi kajian*',
    'Data Okupansi Karyawan pada Tiap Gedung/ Bangunan',
    'Kop Perusahaan',
    'Logo Perusahaan',
    'Stempel Perusahaan',
    'Tanda Tangan Digital Penanggung Jawab',
    'Dokumen Soil Test/Sondir',
    'Peil Banjir',
    'Dokumen Laporan Pemeriksaan Berkala Bangunan Gedung',
    'Konsep Perancangan Arsitektur',
    'Gambar Situasi',
    'Rencana Tapak',
    'Denah',
    'Potongan',
    'Tampak',
    'Detail Bangunan Gedung',
    'Gambar Rencana Tata Ruang Dalam',
    'Gambar Rencana Tata Ruang Luar',
    'Gambar Rencana Pondasi',
    'Kolom',
    'Balok',
    'Pelat Lantai',
    'Rangka Atap',
    'Penutup',
    'Komponen Gedung Lainnya',
    'Gambar Detail Strukur',
    'Laporan Analisa Struktur',
    'Drawing Site Plan',
    'Drawing Penangkal Petir (Detail)',
    'Drawing Instalasi Listrik (SLD) (Detail)',
    'Drawing CCTV (Detail)',
    'Drawing Sound Sistem (Detail)',
    'Drawing Instalasi Air Bersih (Detail)',
    'Drawing Instalasi Air Kotor (Detail)',
    'Drawing TPS/Limbah Non B3 Building (Detail)',
    'Drawing TPS/Limbah B3 Building (Detail)',
    'Drawing Denah Gutter (Detail)',
    'Drawing Sistem Penampungan/pemanfaatan Air Hujan (SPHA)',
];

// Helpers: normalisasi dan validasi nomor WhatsApp
const normalizeWhatsappTo62 = (input: string): string => {
    let s = (input || '').trim();
    s = s.replace(/[^0-9]/g, '');
    if (s.startsWith('0')) {
        s = '62' + s.slice(1);
    } else if (s.startsWith('8')) {
        s = '62' + s;
    }
    return s;
};

const isWhatsappValid = (input: string): boolean => {
    const n = normalizeWhatsappTo62(input);
    return n.startsWith('62') && n.length >= 11 && n.length <= 16;
};

const ProjectEstimation: React.FC = () => {
    const [service, setService] = useState<string>('');
    const [showSlfChecklist, setShowSlfChecklist] = useState<boolean>(false);
    const [showPbgModal, setShowPbgModal] = useState<boolean>(false);
    const [checklistValues, setChecklistValues] = useState<{ status: 'tersedia' | 'tidak' | ''; keterangan: string }[]>(
        slfItems.map(() => ({ status: '', keterangan: '' })),
    );
    const [whatsapp, setWhatsapp] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);
    // Tambahan: validasi nomor WhatsApp
    const [whatsappError, setWhatsappError] = useState<string>('');
    // Tambahan: state untuk form utama
    const [nama, setNama] = useState<string>('');
    const [instansi, setInstansi] = useState<string>('');
    const [lokasi, setLokasi] = useState<string>('');
    const [luas, setLuas] = useState<string>('');
    const [lantai, setLantai] = useState<string>('');
    // Hapus dummy log, ganti dengan validasi
    const [checklistError, setChecklistError] = useState<string>('');
    // Tambahan: simpan link excel dari backend
    const [excelUrl, setExcelUrl] = useState<string>('');

    const handleSubmitInitial = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowSlfChecklist(service === 'JasaSLF');
    };

    // Tambahkan handler klik langsung agar tombol tidak memicu native submit
    const openChecklist = () => {
        if (service === 'JasaSLF') {
            // Inisialisasi checklist sesuai jumlah item SLF
            setChecklistValues(slfItems.map(() => ({ status: '', keterangan: '' })));
            setShowSlfChecklist(true);
            setShowPbgModal(false);
        } else if (service === 'PBG') {
            // Inisialisasi checklist sesuai jumlah item PBG
            setChecklistValues(pbgItems.map(() => ({ status: '', keterangan: '' })));
            setShowSlfChecklist(false);
            setShowPbgModal(true);
        } else {
            setShowSlfChecklist(false);
            setShowPbgModal(false);
        }
    };

    const handleChecklistChange = (index: number, field: 'status' | 'keterangan', value: string) => {
        setChecklistValues((prev) => {
            const next = [...prev];
            if (field === 'status' && (value === 'tersedia' || value === 'tidak' || value === '')) {
                next[index] = { ...next[index], status: value as 'tersedia' | 'tidak' | '' };
            } else if (field === 'keterangan') {
                next[index] = { ...next[index], keterangan: value };
            }
            return next;
        });
    };

    // Tambahan: fungsi untuk membuat preview pesan (mirror backend)
    const buildPreviewMessage = (): string => {
        const lines: string[] = [];
        const headerService = service === 'PBG' ? 'PBG' : 'SLF';
        lines.push(`Data Klien Permohonan ${headerService} 2025`);
        lines.push('');
        // Ringkasan data klien
        lines.push('Data Klien:');
        if (nama) lines.push(`- Nama: ${nama}`);
        if (instansi) lines.push(`- Instansi: ${instansi}`);
        if (lokasi) lines.push(`- Lokasi/Daerah: ${lokasi}`);
        if (luas) lines.push(`- Luas Bangunan: ${luas}`);
        if (lantai) lines.push(`- Jumlah Lantai: ${lantai}`);
        if (service) lines.push(`- Layanan: ${service}`);
        if (whatsapp) lines.push(`- No WhatsApp: ${normalizeWhatsappTo62(whatsapp)}`);
        return lines.join('\n');
    };

    const handleChecklistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Validasi sebelum kirim
            if (!isWhatsappValid(whatsapp)) {
                setWhatsappError('Nomor WhatsApp harus diawali 62 dan angka saja. Contoh: 628123456789');
                return;
            }
            if (checklistValues.some((c) => !c.status)) {
                setChecklistError('Semua status harus diisi untuk setiap item checklist.');
                return;
            } else {
                setChecklistError('');
            }

            setSubmitting(true);
            const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
            const items = service === 'PBG' ? pbgItems : slfItems;
            const endpoint = service === 'PBG' ? '/api/pbg-checklist/send' : '/api/slf-checklist/send';
            const payload = {
                target: normalizeWhatsappTo62(whatsapp),
                service,
                items,
                checklist: checklistValues,
                client: { nama, instansi, lokasi, luas, lantai },
                previewMessage: buildPreviewMessage(),
            };
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
                body: JSON.stringify(payload),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error((data && (data.message as string)) || 'Gagal mengirim checklist.');
            }
            // Simpan link excel (opsional), lalu tutup modal otomatis
            if (data && (data as any).excel_url) {
                setExcelUrl((data as any).excel_url as string);
            }
            // Tutup modal otomatis setelah pengiriman berhasil
            setShowSlfChecklist(false);
            setShowPbgModal(false);
        } catch (err) {
            // Tampilkan pesan error umum (opsional dapat ditambahkan toast/notif)
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowSlfChecklist(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        if (showSlfChecklist) {
            html.style.overflow = 'hidden';
            body.style.overflow = 'hidden';
            body.style.touchAction = 'none';
        } else {
            html.style.overflow = '';
            body.style.overflow = '';
            body.style.touchAction = '';
        }
        return () => {
            html.style.overflow = '';
            body.style.overflow = '';
            body.style.touchAction = '';
        };
    }, [showSlfChecklist]);

    // Kunci scroll untuk modal PBG agar tidak overflow
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        if (showPbgModal) {
            html.style.overflow = 'hidden';
            body.style.overflow = 'hidden';
            body.style.touchAction = 'none';
        } else {
            html.style.overflow = '';
            body.style.overflow = '';
            body.style.touchAction = '';
        }
        return () => {
            html.style.overflow = '';
            body.style.overflow = '';
            body.style.touchAction = '';
        };
    }, [showPbgModal]);

    // Status kelengkapan checklist untuk kontrol tombol Hitung
    const allChecklistFilled = !checklistValues.some((c) => !c.status);

    return (
        <section className="lg:p-4 xl:p-10">
            <div className="relative mb-20 flex min-h-screen items-center justify-center overflow-hidden py-20 md:rounded-3xl lg:p-4 xl:p-10">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/img/general/estimasi.png')",
                    }}
                ></div>

                {/* Content Container */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* Left Side - Text Content */}
                        <div className="space-y-6 text-white">
                            <div className="space-y-4">
                                <h2 className="text-4xl leading-tight font-bold lg:text-5xl xl:text-6xl">
                                    Dapatkan
                                    <br />
                                    Estimasi Proyek
                                    <br />
                                    Anda Sekarang
                                </h2>
                                <p className="max-w-lg text-lg leading-relaxed text-gray-200 lg:text-xl">
                                    Isi data singkat berikut ini, dan tim kami akan segera menghubungi Anda untuk memberikan estimasi yang tepat untuk
                                    kebutuhan proyek konstruksi Anda.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="mx-auto w-full max-w-xl lg:mx-0">
                            <div className="rounded-[19px] bg-[#DBF9FF]/80 p-8 shadow-2xl backdrop-blur-[3.3px]">
                                <div className="mb-6">
                                    <h3 className="mb-2 text-2xl font-bold text-gray-800">Data Klien</h3>
                                </div>

                                <form className="space-y-4" onSubmit={handleSubmitInitial}>
                                    {/* Nama */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Nama</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan nama lengkap"
                                            value={nama}
                                            onChange={(e) => setNama(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Instansi */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Instansi</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Nama perusahaan/instansi"
                                            value={instansi}
                                            onChange={(e) => setInstansi(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* No WhatsApp */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">No WhatsApp</label>
                                        <input
                                            type="tel"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Contoh: 62812xxxxxxx atau 08xxxxxx"
                                            value={whatsapp}
                                            onChange={(e) => {
                                                const v = e.target.value;
                                                setWhatsapp(v);
                                                setWhatsappError(
                                                    isWhatsappValid(v) ? '' : 'Nomor WhatsApp harus diawali 62 dan angka saja. Contoh: 628123456789',
                                                );
                                            }}
                                            required
                                        />
                                        {whatsappError && <p className="mt-1 text-sm text-red-600">{whatsappError}</p>}
                                    </div>

                                    {/* Lokasi/Daerah */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Lokasi/Daerah</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Kota/Kabupaten"
                                            value={lokasi}
                                            onChange={(e) => setLokasi(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Luas Bangunan */}
                                    <div className="relative">
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Luas Bangunan</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-14 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Contoh: 200"
                                            value={luas}
                                            onInput={(e) => {
                                                const onlyDigits = (e.currentTarget.value || '').replace(/\D+/g, '');
                                                e.currentTarget.value = onlyDigits;
                                                setLuas(onlyDigits);
                                            }}
                                            onChange={(e) => {
                                                const onlyDigits = (e.target.value || '').replace(/\D+/g, '');
                                                setLuas(onlyDigits);
                                            }}
                                            required
                                        />
                                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600">m²</span>
                                    </div>

                                    {/* Jumlah Lantai */}
                                    <div className="relative">
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Jumlah Lantai</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-16 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Contoh: 2"
                                            value={lantai}
                                            onInput={(e) => {
                                                const onlyDigits = (e.currentTarget.value || '').replace(/\D+/g, '');
                                                e.currentTarget.value = onlyDigits;
                                                setLantai(onlyDigits);
                                            }}
                                            onChange={(e) => {
                                                const onlyDigits = (e.target.value || '').replace(/\D+/g, '');
                                                setLantai(onlyDigits);
                                            }}
                                            required
                                        />
                                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600">lantai</span>
                                    </div>

                                    {/* Layanan */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Layanan</label>
                                        <select
                                            value={service}
                                            onChange={(e) => setService(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Pilih layanan yang dibutuhkan</option>
                                            <option value="JasaSLF">Jasa SLF</option>
                                            <option value="PBG">PBG</option>
                                        </select>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="button"
                                        onClick={openChecklist}
                                        className="mt-6 w-full transform cursor-pointer rounded-lg bg-[#0B3AB1] px-6 py-4 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* SLF Checklist Form - appears after initial submit when service is Jasa SLF */}
                    {showSlfChecklist && (
                        <div className="fixed inset-0 z-50">
                            {/* Backdrop */}
                            <div className="absolute inset-0 bg-black/50" onClick={() => setShowSlfChecklist(false)} aria-hidden="true" />
                            {/* Modal container */}
                            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                                <div
                                    className="flex h-[85vh] min-h-0 w-full max-w-4xl flex-col overflow-hidden rounded-[19px] bg-white shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <form onSubmit={handleChecklistSubmit} className="flex min-h-0 flex-1 flex-col">
                                        <div className="mb-0 flex shrink-0 items-center justify-between border-b px-6 py-4">
                                            <h3 id="slfChecklistTitle" className="text-2xl font-bold text-gray-800">
                                                Checklist Kelengkapan Dokumen Permohonan SLF 2025
                                            </h3>
                                            <button
                                                type="button"
                                                aria-label="Tutup"
                                                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                onClick={() => setShowSlfChecklist(false)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto px-6 py-4">
                                            <p className="mb-6 text-sm text-gray-600">
                                                Pilih status Tersedia atau Tidak untuk setiap dokumen. Kolom "Disediakan Oleh" dan "Catatan"
                                                dihilangkan sesuai permintaan.
                                            </p>

                                            {/* Ringkasan Data Klien */}
                                            <div className="mb-6 rounded-md border bg-gray-50 p-4">
                                                <h4 className="mb-3 text-base font-semibold text-gray-800">Ringkasan Data Klien</h4>
                                                <ul className="space-y-1 text-sm text-gray-700">
                                                    {nama && <li>Nama: {nama}</li>}
                                                    {instansi && <li>Instansi: {instansi}</li>}
                                                    {lokasi && <li>Lokasi/Daerah: {lokasi}</li>}
                                                    {luas && <li>Luas Bangunan: {luas}</li>}
                                                    {lantai && <li>Jumlah Lantai: {lantai}</li>}
                                                    {service && <li>Layanan: {service}</li>}
                                                    {whatsapp && <li>No WhatsApp: {whatsapp}</li>}
                                                </ul>
                                            </div>

                                            {/* Preview Pesan WhatsApp */}
                                            <div className="mb-6 rounded-md border bg-gray-50 p-4">
                                                <h4 className="mb-3 text-base font-semibold text-gray-800">Preview Pesan yang akan dikirim</h4>
                                                <div className="max-h-48 overflow-auto rounded-md bg-white p-3 text-sm text-gray-800">
                                                    <p className="font-semibold">Data Klien Permohonan SLF 2025</p>
                                                    <div className="mt-2">
                                                        <p className="font-semibold">Data Klien:</p>
                                                        <ul className="ml-4 list-disc">
                                                            {nama && <li>- Nama: {nama}</li>}
                                                            {instansi && <li>- Instansi: {instansi}</li>}
                                                            {lokasi && <li>- Lokasi/Daerah: {lokasi}</li>}
                                                            {luas && <li>- Luas Bangunan: {luas}</li>}
                                                            {lantai && <li>- Jumlah Lantai: {lantai}</li>}
                                                            {service && <li>- Layanan: {service}</li>}
                                                            {whatsapp && <li>- No WhatsApp: {normalizeWhatsappTo62(whatsapp)}</li>}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Link Download Excel */}
                                            {excelUrl && (
                                                <div className="mb-6 rounded-md border bg-green-50 p-4">
                                                    <h4 className="mb-2 text-base font-semibold text-green-800">Link Download Excel</h4>
                                                    <a href={excelUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                        {excelUrl}
                                                    </a>
                                                </div>
                                            )}

                                            {/* Peringatan jika ada item checklist belum berstatus */}
                                            {(checklistError || checklistValues.some((c) => !c.status)) && (
                                                <div className="mb-4 rounded-md border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
                                                    {checklistError ||
                                                        (() => {
                                                            const missingNumbers = checklistValues.reduce((acc: number[], c, i) => {
                                                                if (!c.status) acc.push(i + 1);
                                                                return acc;
                                                            }, []);
                                                            const formatted = missingNumbers.map((n) => formatTwoDigits(n)).join(', ');
                                                            return missingNumbers.length <= 10
                                                                ? `Ada ${missingNumbers.length} item checklist belum diberi status. Nomor yang belum diisi: ${formatted}.`
                                                                : `Ada ${missingNumbers.length} item checklist belum diberi status. Mohon lengkapi semua item sebelum mengirim.`;
                                                        })()}
                                                </div>
                                            )}

                                            {/* Tabel Checklist */}
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                                                No
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                                                Kelengkapan Dokumen
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                                                Status
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                                                Keterangan
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {slfItems.map((item, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-4 py-3 text-sm text-gray-700">{formatTwoDigits(idx + 1)}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-800">{item}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                                    <div className="flex items-center gap-4">
                                                                        <label className="inline-flex items-center gap-2">
                                                                            <input
                                                                                type="radio"
                                                                                name={`status-${idx}`}
                                                                                value="tersedia"
                                                                                checked={checklistValues[idx].status === 'tersedia'}
                                                                                onChange={(e) => handleChecklistChange(idx, 'status', e.target.value)}
                                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                                            />
                                                                            <span className="text-sm text-gray-700">Tersedia</span>
                                                                        </label>
                                                                        <label className="inline-flex items-center gap-2">
                                                                            <input
                                                                                type="radio"
                                                                                name={`status-${idx}`}
                                                                                value="tidak"
                                                                                checked={checklistValues[idx].status === 'tidak'}
                                                                                onChange={(e) => handleChecklistChange(idx, 'status', e.target.value)}
                                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                                            />
                                                                            <span className="text-sm text-gray-700">Tidak</span>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <input
                                                                        type="text"
                                                                        value={checklistValues[idx].keterangan}
                                                                        onChange={(e) => handleChecklistChange(idx, 'keterangan', e.target.value)}
                                                                        placeholder="Tambahkan keterangan (opsional)"
                                                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 border-t bg-white px-6 py-4">
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowSlfChecklist(false)}
                                            >
                                                Tutup
                                            </button>
                                            <button
                                                type="submit"
                                                className="cursor-pointer rounded-md bg-[#0B3AB1] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                                disabled={
                                                    submitting ||
                                                    !!whatsappError ||
                                                    !isWhatsappValid(whatsapp) ||
                                                    checklistValues.some((c) => !c.status)
                                                }
                                            >
                                                {submitting ? 'Mengirim...' : 'Hitung'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* PBG Modal - appears when service is PBG */}
                    {showPbgModal && (
                        <div className="fixed inset-0 z-50">
                            {/* Backdrop */}
                            <div className="absolute inset-0 bg-black/50" onClick={() => setShowPbgModal(false)} aria-hidden="true" />
                            {/* Modal container */}
                            <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
                                <div
                                    className="flex h-[85vh] min-h-0 w-full max-w-4xl flex-col overflow-hidden rounded-[19px] bg-white shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <form onSubmit={handleChecklistSubmit} className="flex min-h-0 flex-1 flex-col">
                                        <div className="mb-0 flex shrink-0 items-center justify-between border-b px-6 py-4">
                                            <h3 id="pbgChecklistTitle" className="text-2xl font-bold text-gray-800">
                                                checklist pbg
                                            </h3>
                                            <button
                                                type="button"
                                                aria-label="Tutup"
                                                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                                onClick={() => setShowPbgModal(false)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto px-6 py-4">
                                            <p className="mb-6 text-sm text-gray-600">
                                                Pilih status Tersedia atau Tidak untuk setiap dokumen PBG. Kolom "Disediakan Oleh" dan "Catatan"
                                                dihilangkan sesuai permintaan.
                                            </p>

                                            {/* Ringkasan Data Klien */}
                                            <div className="mb-6 rounded-md border bg-gray-50 p-4">
                                                <h4 className="mb-3 text-base font-semibold text-gray-800">Ringkasan Data Klien</h4>
                                                <ul className="space-y-1 text-sm text-gray-700">
                                                    {nama && <li>Nama: {nama}</li>}
                                                    {instansi && <li>Instansi: {instansi}</li>}
                                                    {lokasi && <li>Lokasi/Daerah: {lokasi}</li>}
                                                    {luas && <li>Luas Bangunan: {luas}</li>}
                                                    {lantai && <li>Jumlah Lantai: {lantai}</li>}
                                                    {service && <li>Layanan: {service}</li>}
                                                    {whatsapp && <li>No WhatsApp: {whatsapp}</li>}
                                                </ul>
                                            </div>

                                            {/* Preview Pesan WhatsApp */}
                                            <div className="mb-6 rounded-md border bg-gray-50 p-4">
                                                <h4 className="mb-3 text-base font-semibold text-gray-800">Preview Pesan yang akan dikirim</h4>
                                                <div className="max-h-48 overflow-auto rounded-md bg-white p-3 text-sm text-gray-800">
                                                    <p className="font-semibold">{`Data Klien Permohonan ${service === 'PBG' ? 'PBG' : 'SLF'} 2025`}</p>
                                                    <div className="mt-2">
                                                        <p className="font-semibold">Data Klien:</p>
                                                        <ul className="ml-4 list-disc">
                                                            {nama && <li>- Nama: {nama}</li>}
                                                            {instansi && <li>- Instansi: {instansi}</li>}
                                                            {lokasi && <li>- Lokasi/Daerah: {lokasi}</li>}
                                                            {luas && <li>- Luas Bangunan: {luas}</li>}
                                                            {lantai && <li>- Jumlah Lantai: {lantai}</li>}
                                                            {service && <li>- Layanan: {service}</li>}
                                                            {whatsapp && <li>- No WhatsApp: {normalizeWhatsappTo62(whatsapp)}</li>}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Link Download Excel */}
                                            {excelUrl && (
                                                <div className="mb-6 rounded-md border bg-green-50 p-4">
                                                    <h4 className="mb-2 text-base font-semibold text-green-800">Link Download Excel</h4>
                                                    <a href={excelUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                                        {excelUrl}
                                                    </a>
                                                </div>
                                            )}

                                            {/* Peringatan jika ada item checklist belum berstatus */}
                                            {(checklistError || checklistValues.some((c) => !c.status)) && (
                                                <div className="mb-4 rounded-md border-l-4 border-red-500 bg-red-50 p-3 text-sm text-red-700">
                                                    {checklistError ||
                                                        (() => {
                                                            const missingNumbers = checklistValues.reduce((acc: number[], c, i) => {
                                                                if (!c.status) acc.push(i + 1);
                                                                return acc;
                                                            }, []);
                                                            const formatted = missingNumbers.map((n) => formatTwoDigits(n)).join(', ');
                                                            return missingNumbers.length <= 10
                                                                ? `Ada ${missingNumbers.length} item checklist belum diberi status. Nomor yang belum diisi: ${formatted}.`
                                                                : `Ada ${missingNumbers.length} item checklist belum diberi status. Mohon lengkapi semua item sebelum mengirim.`;
                                                        })()}
                                                </div>
                                            )}

                                            {/* Tabel Checklist */}
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                                                No
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                                                Kelengkapan Dokumen
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                                                Status
                                                            </th>
                                                            <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-600 uppercase">
                                                                Keterangan
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 bg-white">
                                                        {pbgItems.map((item, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-4 py-3 text-sm text-gray-700">{formatTwoDigits(idx + 1)}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-800">{item}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700">
                                                                    <div className="flex items-center gap-4">
                                                                        <label className="inline-flex items-center gap-2">
                                                                            <input
                                                                                type="radio"
                                                                                name={`status-pbg-${idx}`}
                                                                                value="tersedia"
                                                                                checked={checklistValues[idx]?.status === 'tersedia'}
                                                                                onChange={(e) => handleChecklistChange(idx, 'status', e.target.value)}
                                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                                            />
                                                                            <span className="text-sm text-gray-700">Tersedia</span>
                                                                        </label>
                                                                        <label className="inline-flex items-center gap-2">
                                                                            <input
                                                                                type="radio"
                                                                                name={`status-pbg-${idx}`}
                                                                                value="tidak"
                                                                                checked={checklistValues[idx]?.status === 'tidak'}
                                                                                onChange={(e) => handleChecklistChange(idx, 'status', e.target.value)}
                                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                                            />
                                                                            <span className="text-sm text-gray-700">Tidak</span>
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <input
                                                                        type="text"
                                                                        value={checklistValues[idx]?.keterangan || ''}
                                                                        onChange={(e) => handleChecklistChange(idx, 'keterangan', e.target.value)}
                                                                        placeholder="Tambahkan keterangan (opsional)"
                                                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 border-t bg-white px-6 py-4">
                                            <button
                                                type="button"
                                                className="cursor-pointer rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                                onClick={() => setShowPbgModal(false)}
                                            >
                                                Tutup
                                            </button>
                                            <button
                                                type="submit"
                                                className="cursor-pointer rounded-md bg-[#0B3AB1] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                                disabled={
                                                    submitting ||
                                                    !!whatsappError ||
                                                    !isWhatsappValid(whatsapp) ||
                                                    checklistValues.some((c) => !c.status)
                                                }
                                            >
                                                {submitting ? 'Mengirim...' : 'Hitung'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectEstimation;

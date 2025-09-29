import React from 'react';

const ProjectEstimation: React.FC = () => {
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
                                    Isi data singkat berikut ini, dan tim kami akan segera menghubungi Anda untuk memberikan estimasi yang
                                    tepat untuk kebutuhan proyek konstruksi Anda.
                                </p>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="mx-auto w-full max-w-xl lg:mx-0">
                            <div className="rounded-[19px] bg-[#DBF9FF]/80 p-8 shadow-2xl backdrop-blur-[3.3px]">
                                <div className="mb-6">
                                    <h3 className="mb-2 text-2xl font-bold text-gray-800">Data Klien</h3>
                                </div>

                                <form className="space-y-4">
                                    {/* Nama */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Nama</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </div>

                                    {/* Instansi */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Instansi</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Nama perusahaan/instansi"
                                        />
                                    </div>

                                    {/* No WhatsApp */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">No WhatsApp</label>
                                        <input
                                            type="tel"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </div>

                                    {/* Lokasi/Daerah */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Lokasi/Daerah</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Kota/Kabupaten"
                                        />
                                    </div>

                                    {/* Luas Bangunan */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Luas Bangunan</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Contoh: 200 m²"
                                        />
                                    </div>

                                    {/* Jumlah Lantai */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Jumlah Lantai</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Contoh: 2"
                                            min="1"
                                        />
                                    </div>

                                    {/* Layanan */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Layanan</label>
                                        <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500">
                                            <option value="">Pilih layanan yang dibutuhkan</option>
                                            <option value="JasaSLF">Jasa SLF</option>
                                            <option value="PBG">PBG</option>
                                        </select>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="mt-6 w-full transform cursor-pointer rounded-lg bg-[#0B3AB1] px-6 py-4 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectEstimation;
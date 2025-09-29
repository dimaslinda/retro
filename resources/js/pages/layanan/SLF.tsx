import { Head } from '@inertiajs/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SLF() {
    return (
        <>
            <Head title="SLF - Sertifikat Laik Fungsi | Retro Engineering" />
            <Header />
            
            <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Sertifikat Laik Fungsi
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Layanan profesional untuk memastikan bangunan Anda memenuhi standar keselamatan dan kelayakan fungsi sesuai peraturan yang berlaku
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300">
                                Konsultasi Gratis
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300">
                                Download Brosur
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Apa itu Sertifikat Laik Fungsi?</h2>
                            <p className="text-lg text-gray-600">
                                Sertifikat Laik Fungsi (SLF) adalah dokumen yang menyatakan bahwa bangunan gedung telah sesuai dengan fungsi yang ditetapkan berdasarkan hasil pemeriksaan kelaikan fungsi bangunan gedung.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Mengapa SLF Penting?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                        <span className="text-gray-700">Memastikan keselamatan pengguna bangunan</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                        <span className="text-gray-700">Kewajiban hukum sesuai UU No. 28 Tahun 2002</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                        <span className="text-gray-700">Syarat untuk operasional bangunan</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                        <span className="text-gray-700">Meningkatkan nilai properti</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <h4 className="text-xl font-bold text-gray-800 mb-4">Masa Berlaku SLF</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Bangunan Hunian</span>
                                        <span className="font-semibold text-blue-600">20 Tahun</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Bangunan Komersial</span>
                                        <span className="font-semibold text-blue-600">15 Tahun</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Bangunan Industri</span>
                                        <span className="font-semibold text-blue-600">10 Tahun</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Bangunan Khusus</span>
                                        <span className="font-semibold text-blue-600">5 Tahun</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
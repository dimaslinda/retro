import React from 'react';

const Articles: React.FC = () => {
    return (
        <section className="bg-gray-50 py-16 lg:p-4 xl:p-10">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-2xl font-medium text-[#0B3AB1] italic">Artikel</p>
                        <h2 className="text-3xl font-bold text-gray-900 lg:text-6xl">Berita Terbaru</h2>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <button className="inline-flex cursor-pointer items-center gap-3 rounded-lg bg-[#0B3AB1] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                            TAMPILKAN SELENGKAPNYA
                            <svg
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Main Article */}
                <div>
                    <div className="relative overflow-hidden rounded-t-2xl">
                        <div className="absolute inset-0">
                            <img src="/img/general/estimasi.png" alt="Artikel Utama" className="h-full w-full object-cover" />
                        </div>
                        <div className="relative px-8 py-32 lg:px-16">
                            <div className="max-w-2xl">
                                <h3 className="mb-4 text-3xl font-bold text-white lg:text-4xl">Lorem Ipsum Dolor Sit Amet</h3>
                                <p className="mb-6 text-lg leading-relaxed text-blue-100">
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Porta elementum a enim euismod quam justo lectus.
                                </p>
                                <button className="inline-flex cursor-pointer items-center rounded-lg bg-cyan-400 px-6 py-3 font-medium text-blue-900 transition-colors duration-200 hover:bg-cyan-300">
                                    Read More
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Cards */}
                <div className="grid grid-cols-1 gap-8 rounded-b-2xl bg-[#0B3AB1] p-6 md:grid-cols-2 md:p-10 lg:grid-cols-3">
                    {/* Card 1 */}
                    <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <div className="relative">
                            <img
                                src="/img/general/layanan.png"
                                alt="Artikel 1"
                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <button className="inline-flex items-center rounded-lg bg-[#5BDFFB] px-4 py-2 text-sm font-medium text-blue-900 transition-colors duration-200 hover:bg-cyan-300">
                                    Read More
                                    <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="mb-3 text-xl font-bold text-gray-900">Lorem Ipsum Dolor Sit</h4>
                            <p className="leading-relaxed text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Porta elementum a enim euismod quam justo lectus.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
                        <div className="relative">
                            <img
                                src="/img/general/layanan.png"
                                alt="Artikel 2"
                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <button className="inline-flex items-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-blue-900 transition-colors duration-200 hover:bg-cyan-300">
                                    Read More
                                    <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="mb-3 text-xl font-bold text-gray-900">Lorem Ipsum Dolor Sit</h4>
                            <p className="leading-relaxed text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Porta elementum a enim euismod quam justo lectus.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl md:col-span-2 lg:col-span-1">
                        <div className="relative">
                            <img
                                src="/img/general/layanan.png"
                                alt="Artikel 3"
                                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <button className="inline-flex items-center rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-blue-900 transition-colors duration-200 hover:bg-cyan-300">
                                    Read More
                                    <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <h4 className="mb-3 text-xl font-bold text-gray-900">Lorem Ipsum Dolor Sit</h4>
                            <p className="leading-relaxed text-gray-600">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Porta elementum a enim euismod quam justo lectus.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Articles;
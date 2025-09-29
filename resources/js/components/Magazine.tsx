import React from 'react';

const Magazine: React.FC = () => {
    return (
        <section className="relative overflow-hidden py-16" style={{ background: 'linear-gradient(180deg, #5BDFFB 0%, #0B3AB1 100%)' }}>
            {/* Background Magazine Image - Right Side */}
            <div className="absolute top-0 right-0 h-full w-1/2">
                <img src="/img/general/magazine.png" alt="Background Magazine" className="h-full w-full object-cover opacity-20" />
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 h-96 w-96 translate-x-48 -translate-y-48 rounded-full bg-white"></div>
                <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-32 translate-y-32 rounded-full bg-white"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-9xl font-bold text-white opacity-5">
                    PROFILE 2025
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                {/* Header */}
                <div className="mb-16 flex flex-col items-start justify-between lg:flex-row lg:items-center">
                    <div>
                        <h2 className="mb-4 text-6xl font-bold tracking-wider text-white lg:text-7xl">MAGAZINE</h2>
                    </div>
                </div>

                {/* Magazine Layout - Images Side by Side */}
                <div className="flex flex-wrap justify-center gap-8">
                    {/* Magazine Image 1 */}
                    <a href="#" className="magazine-card group block cursor-pointer" data-magazine="1">
                        <img
                            src="/img/general/magazine.png"
                            alt="Company Profile 2025"
                            className="h-80 w-64 rounded-lg object-cover shadow-2xl transition-all duration-300"
                        />
                    </a>

                    {/* Magazine Image 2 */}
                    <a href="#" className="magazine-card group block cursor-pointer" data-magazine="2">
                        <img
                            src="/img/general/magazine.png"
                            alt="Company Profile 2025"
                            className="h-80 w-64 rounded-lg object-cover shadow-2xl transition-all duration-300"
                        />
                    </a>

                    {/* Magazine Image 3 */}
                    <a href="#" className="magazine-card group block cursor-pointer" data-magazine="3">
                        <img
                            src="/img/general/magazine.png"
                            alt="Company Profile 2025"
                            className="h-80 w-64 rounded-lg object-cover shadow-2xl transition-all duration-300"
                        />
                    </a>

                    {/* Featured Magazine Image */}
                    <a href="#" className="magazine-card group block cursor-pointer" data-magazine="featured">
                        <img
                            src="/img/general/magazine.png"
                            alt="Company Profile 2025 Featured"
                            className="h-80 w-64 rounded-lg object-cover shadow-2xl transition-all duration-300"
                        />
                    </a>
                </div>

                {/* Button */}
                <div className="mt-12 flex justify-center">
                    <button className="flex cursor-pointer items-center gap-2 bg-[#0B3AB1] px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-900">
                        TAMPILKAN SELENGKAPNYA
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Magazine;
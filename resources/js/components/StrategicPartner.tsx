import React from 'react';

const StrategicPartner: React.FC = () => {
    return (
        <section
            className="relative overflow-hidden bg-cover bg-center bg-no-repeat md:py-20 lg:py-0"
            style={{
                backgroundImage: "url('/img/general/bg-mitra.png')",
            }}
        >
            {/* Content Container */}
            <div className="relative z-10 flex items-center py-10">
                <div className="mx-auto flex w-full max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-1 flex-col items-center bg-[#0B3AB1] lg:max-h-[600px] lg:flex-row">
                        <img className="h-full w-full object-cover" src="/img/general/mitra.jpg" alt="" />
                        <div className="flex flex-col justify-between bg-[#0B3AB1] p-6 leading-normal lg:bg-transparent lg:p-2 xl:p-10">
                            <h5 className="mb-5 text-2xl leading-tight font-bold tracking-normal text-white md:text-4xl lg:text-6xl">
                                Mitra Strategis Konstruksi <br className="hidden xl:block" /> Anda
                            </h5>
                            <p className="mb-3 text-sm font-normal text-white">
                                Sebagai konsultan sipil dan konstruksi, Retro mendampingi Anda mulai dari perencanaan, perizinan, audit
                                teknis, hingga pembangunan baru maupun renovasi. Dengan tenaga ahli berpengalaman, kami hadir bukan sekadar
                                penyedia jasa, melainkan mitra yang memastikan setiap detail proyek berjalan profesional, efisien, dan sesuai
                                regulasi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StrategicPartner;
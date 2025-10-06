import React from 'react';

const About: React.FC = () => {
    return (
        <section id="tentang-kami" className="about-section">
            <div className="about-container">
                <div className="about-content">
                    <div className="about-text">
                        <h3 className="about-subtitle">Tentang Kami</h3>
                        <h2 className="about-title">Mitra Strategis dalam Keamanan Konstruksi Anda</h2>
                        <p className="about-description">
                            Retro Ciptaharsa Nawasena hadir sebagai konsultan profesional di bidang konstruksi yang berfokus pada keamanan, efisiensi,
                            dan kualitas. Dengan pengalaman bertahun-tahun, kami berkomitmen menyediakan layanan menyeluruh mulai dari audit struktur,
                            perencanaan detail, hingga manajemen konstruksi agar setiap proyek berjalan lancar, tepat waktu, sesuai anggaran, dan
                            memenuhi standar terbaik.
                        </p>
                        <p className="about-description">
                            Kami percaya bahwa keamanan bukan hanya tentang struktur yang kuat, tetapi juga tentang kepercayaan, keberlangsungan, dan
                            nilai investasi jangka panjang. Karena itu, setiap solusi yang kami tawarkan selalu mengutamakan ketelitian teknis,
                            transparansi, serta komitmen pada kualitas.
                        </p>
                        <p className="about-description">
                            Bersama kami, Anda mendapatkan lebih dari sekedar konsultan—Anda mendapatkan partner terpercaya yang siap mendampingi
                            setiap langkah pembangunan.
                        </p>
                    </div>
                    <div className="about-images">
                        <div className="about-image-container">
                            <img src="/img/general/tentang.png" alt="Tim konstruksi profesional" className="about-image" />
                            <div className="about-image-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

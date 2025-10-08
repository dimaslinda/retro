import { Head, usePage } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import AboutServiceSection from '../../components/AboutServiceSection';
import AdvantageSection from '../../components/AdvantageSection';
import CtaBannerSection from '../../components/CtaBannerSection';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RoadmapSection from '../../components/RoadmapSection';
import WhyNeedSection from '../../components/WhyNeedSection';

export default function SLF() {
    const { props } = usePage<{ seo?: SEOProps }>();
    const seo = props?.seo;
    const slfHeroContent = {
        title: 'Bangunan Aman, Legal, dan Bernilai Tinggi Dimulai dari Sini!',
        description:
            'Retro hadir sebagai mitra terpercaya dalam konsultaN sipil. Dari izin SLF & PBG, audit struktur, hingga pembangunan. Kami siap memastikan proyek Anda berjalan tepat, aman, dan berkelanjutan.',
        buttonText: 'Konsultasi Sekarang',
        buttonAction: () => {
            // Scroll ke section konsultasi
            const consultSection = document.querySelector('#konsultasi-slf');
            if (consultSection) {
                consultSection.scrollIntoView({ behavior: 'smooth' });
            }
        },
        backgroundImage: '/img/general/bg-slf.webp', // Menggunakan gambar yang sama dulu, bisa diganti nanti
    };

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const sections = Array.from(containerRef.current.children) as HTMLElement[];
        const headerSection = sections[0];

        // Animate hero (Header) on mount so user immediately sees GSAP effect
        if (headerSection) {
            const heroItems = gsap.utils.toArray<HTMLElement>(headerSection.querySelectorAll('h1, h2, p, a, button'));
            if (heroItems.length) {
                gsap.from(heroItems, {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    clearProps: 'transform,opacity,visibility',
                });
            }
        }

        // Reveal remaining sections on scroll
        sections.slice(1).forEach((section) => {
            gsap.from(section, {
                autoAlpha: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                immediateRender: false,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Stagger reveal for common text elements inside sections
            const items = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('h1, h2, h3, p, a, button, li'));
            if (items.length) {
                gsap.from(items, {
                    autoAlpha: 0,
                    y: 15,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power2.out',
                    immediateRender: false,
                    clearProps: 'transform,opacity,visibility',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }
        });

        // Ensure ScrollTrigger calculates correct positions after images/fonts load
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
            gsap.killTweensOf(sections);
        };
    }, []);

    // Data untuk AboutServiceSection
    const slfAboutData = {
        badge: 'Tentang SLF',
        title: 'Apa Itu Sertifikat\nLaik Fungsi (SLF)?',
        description: [
            'SLF adalah sertifikat yang diberikan pemerintah daerah sebagai bukti bahwa bangunan fungsi bangunan telah sesuai dengan rencana teknis dan layak fungsi sesuai dengan ketentuan dalam undang-undang bangunan gedung.',
        ],
        featuresTitle: 'SLF menjamin bangunan Anda:',
        features: [
            {
                label: 'AMAN',
                description: 'Struktur kuat, tahan bencana, dilengkapi sistem proteksi kebakaran.',
            },
            {
                label: 'SEHAT',
                description: 'Ventilasi udara, pencahayaan, dan sanitasi terjamin.',
            },
            {
                label: 'NYAMAN',
                description: 'Lingkungan bangunan membuat penghuni merasa betah.',
            },
            {
                label: 'MUDAH',
                description: 'Akses ramah difabel dan mudah dijangkau siapa pun.',
            },
        ],
        image: {
            src: '/img/general/profile-slf.webp',
            alt: 'Pekerja konstruksi sedang melakukan inspeksi bangunan',
        },
    };

    // Data untuk WhyNeedSection
    const whyNeedSLFData = {
        title: 'Kenapa Anda<br />Harus Punya<br />SLF?',
        subtitle:
            'Memiliki Sertifikat Laik Fungsi (SLF) adalah bukti bahwa bangunan Anda telah memenuhi standar keselamatan, kesehatan, kenyamanan, dan kemudahan sesuai peraturan pemerintah.',
        backgroundImage: '/img/general/bg-slf2.webp',
        benefits: [
            {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
                        <path
                            d="M9 9C9 7.80653 9.47411 6.66193 10.318 5.81802C11.1619 4.97411 12.3065 4.5 13.5 4.5H31.5C32.0967 4.50013 32.6689 4.73726 33.0907 5.15925L44.3408 16.4093C44.7627 16.8311 44.9999 17.4033 45 18V45C45 46.1935 44.5259 47.3381 43.682 48.182C42.8381 49.0259 41.6935 49.5 40.5 49.5H13.5C12.3065 49.5 11.1619 49.0259 10.318 48.182C9.47411 47.3381 9 46.1935 9 45V9ZM39.5685 18L31.5 9.9315V18H39.5685ZM27 9H13.5V45H40.5V22.5H29.25C28.6533 22.5 28.081 22.2629 27.659 21.841C27.2371 21.419 27 20.8467 27 20.25V9ZM18 29.25C18 28.6533 18.2371 28.081 18.659 27.659C19.081 27.2371 19.6533 27 20.25 27H33.75C34.3467 27 34.919 27.2371 35.341 27.659C35.7629 28.081 36 28.6533 36 29.25C36 29.8467 35.7629 30.419 35.341 30.841C34.919 31.2629 34.3467 31.5 33.75 31.5H20.25C19.6533 31.5 19.081 31.2629 18.659 30.841C18.2371 30.419 18 29.8467 18 29.25ZM18 38.25C18 37.6533 18.2371 37.081 18.659 36.659C19.081 36.2371 19.6533 36 20.25 36H33.75C34.3467 36 34.919 36.2371 35.341 36.659C35.7629 37.081 36 37.6533 36 38.25C36 38.8467 35.7629 39.419 35.341 39.841C34.919 40.2629 34.3467 40.5 33.75 40.5H20.25C19.6533 40.5 19.081 40.2629 18.659 39.841C18.2371 39.419 18 38.8467 18 38.25Z"
                            fill="white"
                        />
                    </svg>
                ),
                title: 'Legalitas Wajib',
                description: 'Sesuai UU No. 28 Tahun 2002 tentang Bangunan Gedung',
            },
            {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <g clipPath="url(#clip0_171_819)">
                            <path
                                d="M2 53.1601H32M28 53.1601V43.1601H6V53.1601M36 23.1601L54 41.1601M31.148 4.00806L16.808 18.3481C16.0581 19.0982 15.6369 20.1154 15.6369 21.1761C15.6369 22.2367 16.0581 23.2539 16.808 24.0041L23.144 30.3401C23.8941 31.0899 24.9113 31.5112 25.972 31.5112C27.0327 31.5112 28.0499 31.0899 28.8 30.3401L43.14 16.0001C43.8899 15.2499 44.3112 14.2327 44.3112 13.1721C44.3112 12.1114 43.8899 11.0942 43.14 10.3441L36.8 4.00806C36.0499 3.25818 35.0327 2.83691 33.972 2.83691C32.9113 2.83691 31.8941 3.25818 31.144 4.00806H31.148Z"
                                stroke="white"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_171_819">
                                <rect width="56" height="56" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                ),
                title: 'Hindari Sanksi Berat',
                description: 'Tanpa SLF, siap-siap terkena denda, pencabutan IMB, bahkan pembongkaran.',
            },
            {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                        <path
                            d="M40.9592 3.25H28.4741C28.086 3.24972 27.7135 3.40308 27.4381 3.67657L2.47813 28.6305C1.93174 29.1796 1.625 29.9227 1.625 30.6973C1.625 31.4719 1.93174 32.215 2.47813 32.7641L14.3609 44.6469C14.9102 45.1933 15.6535 45.5001 16.4282 45.5001C17.203 45.5001 17.9463 45.1933 18.4956 44.6469L43.4484 19.7031C43.7219 19.4277 43.8753 19.0553 43.875 18.6672V6.175C43.8769 5.79113 43.8028 5.41068 43.6571 5.05555C43.5113 4.70043 43.2967 4.37764 43.0257 4.10577C42.7547 3.83391 42.4326 3.61833 42.0779 3.47146C41.7232 3.32459 41.343 3.24933 40.9592 3.25Z"
                            stroke="white"
                            strokeWidth="3.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M35.75 14.625C35.1072 14.625 34.4789 14.4344 33.9444 14.0773C33.4099 13.7202 32.9934 13.2126 32.7474 12.6187C32.5014 12.0249 32.437 11.3714 32.5624 10.741C32.6879 10.1105 32.9974 9.53143 33.4519 9.0769C33.9064 8.62238 34.4855 8.31285 35.116 8.18745C35.7464 8.06205 36.3999 8.12641 36.9937 8.37239C37.5876 8.61838 38.0952 9.03494 38.4523 9.5694C38.8094 10.1039 39 10.7322 39 11.375C39 12.237 38.6576 13.0636 38.0481 13.6731C37.4386 14.2826 36.612 14.625 35.75 14.625Z"
                            fill="white"
                        />
                        <path
                            d="M23.3594 48.75L49.9688 22.1406C50.1011 22.0072 50.2053 21.8486 50.275 21.6741C50.3448 21.4996 50.3788 21.3129 50.375 21.125V8.125"
                            stroke="white"
                            strokeWidth="3.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ),
                title: 'Naikkan Nilai Properti',
                description: 'Bangunan dengan SLF jauh lebih tinggi nilai jual & sewanya.',
            },
            {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                        <path
                            d="M26 3.25L6.5 9.75V29.25C6.5 40.0207 15.2293 48.75 26 48.75C36.7707 48.75 45.5 40.0207 45.5 29.25V9.75L26 3.25ZM41.8438 29.25C41.8438 37.9996 34.7496 45.0938 26 45.0938C17.2504 45.0938 10.1562 37.9996 10.1562 29.25V12.4922L26 6.90625L41.8438 12.4922V29.25Z"
                            fill="white"
                        />
                        <path
                            d="M19.2156 24.1257C19.0461 23.9555 18.8447 23.8204 18.6229 23.7282C18.4012 23.6361 18.1634 23.5886 17.9232 23.5886C17.683 23.5886 17.4452 23.6361 17.2234 23.7282C17.0016 23.8204 16.8002 23.9555 16.6308 24.1257C16.4606 24.2951 16.3255 24.4965 16.2334 24.7183C16.1412 24.9401 16.0938 25.1779 16.0938 25.4181C16.0938 25.6582 16.1412 25.896 16.2334 26.1178C16.3255 26.3396 16.4606 26.541 16.6308 26.7105L23.2019 33.2815L23.3085 33.3882C23.4688 33.5488 23.6592 33.6762 23.8687 33.7631C24.0783 33.85 24.3029 33.8947 24.5298 33.8947C24.7567 33.8947 24.9813 33.85 25.1909 33.7631C25.4005 33.6762 25.5908 33.5488 25.7511 33.3882L37.1007 22.0386C37.2613 21.8783 37.3887 21.6879 37.4756 21.4784C37.5625 21.2688 37.6073 21.0442 37.6073 20.8173C37.6073 20.5904 37.5625 20.3658 37.4756 20.1562C37.3887 19.9466 37.2613 19.7563 37.1007 19.596L36.9585 19.4538C36.7983 19.2932 36.6079 19.1658 36.3983 19.0789C36.1888 18.992 35.9641 18.9473 35.7372 18.9473C35.5104 18.9473 35.2857 18.992 35.0762 19.0789C34.8666 19.1658 34.6762 19.2932 34.516 19.4538L24.5273 29.4374L19.2156 24.1257Z"
                            fill="white"
                        />
                    </svg>
                ),
                title: 'Rasa Aman & Tenang',
                description: 'Sesuai UU No. 28 Tahun 2002 tentang Bangunan Gedung',
            },
        ],
    };

    // Data untuk AdvantageSection
    const advantageData = {
        subtitle: 'Keunggulan Kami',
        title: 'Kami Hadir Dengan Keunggulan',
        advantages: [
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <path d="M21 26.25C21 27.6424 21.5531 28.9777 22.5377 29.9623C23.5223 30.9469 24.8576 31.5 26.25 31.5C27.6424 31.5 28.9777 30.9469 29.9623 29.9623C30.9469 28.9777 31.5 27.6424 31.5 26.25C31.5 24.8576 30.9469 23.5223 29.9623 22.5377C28.9777 21.5531 27.6424 21 26.25 21C24.8576 21 23.5223 21.5531 22.5377 22.5377C21.5531 23.5223 21 24.8576 21 26.25Z" stroke="#0B3AB1" stroke-width="2.47059" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22.75 30.6251V38.5001L26.25 35.8751L29.75 38.5001V30.6251" stroke="#0B3AB1" stroke-width="2.47059" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.5 33.25H8.75C7.82174 33.25 6.9315 32.8813 6.27513 32.2249C5.61875 31.5685 5.25 30.6783 5.25 29.75V12.25C5.25 10.325 6.825 8.75 8.75 8.75H33.25C34.1783 8.75 35.0685 9.11875 35.7249 9.77513C36.3813 10.4315 36.75 11.3217 36.75 12.25V29.75C36.7494 30.3638 36.5874 30.9666 36.2802 31.498C35.973 32.0293 35.5315 32.4706 35 32.7775M10.5 15.75H31.5M10.5 21H15.75M10.5 26.25H14" stroke="#0B3AB1" stroke-width="2.47059" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
                title: 'Tim Berpengalaman',
                description: 'Tim ahli dengan pengalaman bertahun-tahun dalam bidang sertifikasi laik fungsi bangunan gedung',
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <g clip-path="url(#clip0_204_58)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0003 7.85718C20.5686 7.85718 21.1136 8.08294 21.5155 8.48481C21.9174 8.88667 22.1431 9.43171 22.1431 10V20.2143L28.246 23.8772C28.4902 24.0205 28.7036 24.2109 28.8738 24.4372C29.0441 24.6635 29.1677 24.9213 29.2377 25.1957C29.3077 25.4701 29.3226 25.7557 29.2815 26.0359C29.2405 26.3161 29.1443 26.5853 28.9985 26.8281C28.8528 27.0709 28.6603 27.2824 28.4324 27.4504C28.2044 27.6184 27.9453 27.7395 27.6703 27.8068C27.3952 27.874 27.1095 27.8861 26.8297 27.8423C26.5499 27.7985 26.2816 27.6996 26.0403 27.5515L18.8974 23.2657C18.5802 23.0753 18.3177 22.8061 18.1355 22.4841C17.9532 22.1622 17.8574 21.7986 17.8574 21.4286V10C17.8574 9.43171 18.0832 8.88667 18.485 8.48481C18.8869 8.08294 19.432 7.85718 20.0003 7.85718Z" fill="#0B3AB1"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.2856 20C4.28504 16.7336 5.30233 13.5483 7.19602 10.8869C9.08972 8.22547 11.7657 6.22031 14.8518 5.15023C17.9379 4.08015 21.2808 3.99834 24.4155 4.91617C27.5503 5.834 30.3211 7.70586 32.3427 10.2714L29.5827 13.0286C29.3826 13.2282 29.2462 13.4827 29.1908 13.7599C29.1353 14.0371 29.1634 14.3245 29.2714 14.5857C29.3794 14.847 29.5624 15.0703 29.7974 15.2274C30.0323 15.3846 30.3086 15.4685 30.5913 15.4686H38.5713C38.9502 15.4686 39.3136 15.3181 39.5815 15.0502C39.8494 14.7823 39.9999 14.4189 39.9999 14.04V6.05715C40.0004 5.77424 39.9169 5.49754 39.7599 5.26214C39.603 5.02675 39.3797 4.84325 39.1184 4.73491C38.857 4.62658 38.5694 4.59828 38.2919 4.65362C38.0145 4.70895 37.7597 4.84542 37.5599 5.04572L35.3885 7.22001C32.5087 3.7533 28.5426 1.36081 24.1329 0.430391C19.7233 -0.500027 15.1286 0.0861718 11.0938 2.09396C7.05901 4.10174 3.82059 7.41341 1.90355 11.4921C-0.0134952 15.5708 -0.496787 20.1774 0.53202 24.5652C1.56083 28.9529 4.04142 32.8646 7.57167 35.666C11.1019 38.4675 15.4749 39.9945 19.9816 39.9995C24.4884 40.0045 28.8647 38.4873 32.4012 35.6937C35.9377 32.9001 38.427 28.994 39.4656 24.6086C39.5925 24.0566 39.4958 23.4769 39.1966 22.9961C38.8974 22.5152 38.4199 22.1724 37.8687 22.0425C37.3175 21.9126 36.7372 22.0063 36.2548 22.3029C35.7724 22.5996 35.427 23.0752 35.2942 23.6257C34.409 27.3773 32.1758 30.6726 29.0193 32.885C25.8629 35.0974 22.0034 36.0725 18.1749 35.6249C14.3464 35.1772 10.816 33.3381 8.25506 30.4572C5.69416 27.5763 4.28144 23.8546 4.2856 20Z" fill="#0B3AB1"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_204_58">
                        <rect width="40" height="40" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>`,
                title: 'Cepat & Transparan',
                description: 'Proses yang cepat dan transparan dengan update progress secara real-time untuk kemudahan Anda',
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <g clip-path="url(#clip0_236_633)">
                        <path d="M24.3018 24.1787C23.0986 23.1533 21.7656 22.3672 20.3027 21.8203C18.8398 21.2734 17.3223 21 15.75 21C14.5469 21 13.3848 21.1572 12.2637 21.4717C11.1426 21.7861 10.0967 22.2236 9.12598 22.7842C8.15527 23.3447 7.27344 24.0283 6.48047 24.835C5.6875 25.6416 5.00391 26.5303 4.42969 27.501C3.85547 28.4717 3.41113 29.5176 3.09668 30.6387C2.78223 31.7598 2.625 32.9219 2.625 34.125H0C0 32.4844 0.239258 30.9053 0.717773 29.3877C1.19629 27.8701 1.88672 26.4688 2.78906 25.1836C3.69141 23.8984 4.75781 22.7568 5.98828 21.7588C7.21875 20.7607 8.61328 19.9746 10.1719 19.4004C8.62695 18.3887 7.42383 17.1172 6.5625 15.5859C5.70117 14.0547 5.26367 12.3594 5.25 10.5C5.25 9.05078 5.52344 7.69043 6.07031 6.41895C6.61719 5.14746 7.3623 4.0332 8.30566 3.07617C9.24902 2.11914 10.3633 1.36719 11.6484 0.820312C12.9336 0.273438 14.3008 0 15.75 0C17.1992 0 18.5596 0.273438 19.8311 0.820312C21.1025 1.36719 22.2168 2.1123 23.1738 3.05566C24.1309 3.99902 24.8828 5.11328 25.4297 6.39844C25.9766 7.68359 26.25 9.05078 26.25 10.5C26.25 11.4023 26.1406 12.2842 25.9219 13.1455C25.7031 14.0068 25.375 14.8203 24.9375 15.5859C24.5 16.3516 23.9873 17.0557 23.3994 17.6982C22.8115 18.3408 22.1211 18.9082 21.3281 19.4004C22.2168 19.7422 23.0645 20.1592 23.8711 20.6514C24.6777 21.1436 25.4365 21.6973 26.1475 22.3125L24.3018 24.1787ZM7.875 10.5C7.875 11.5938 8.08008 12.6123 8.49023 13.5557C8.90039 14.499 9.46094 15.333 10.1719 16.0576C10.8828 16.7822 11.7168 17.3496 12.6738 17.7598C13.6309 18.1699 14.6562 18.375 15.75 18.375C16.8301 18.375 17.8486 18.1699 18.8057 17.7598C19.7627 17.3496 20.5967 16.7891 21.3076 16.0781C22.0186 15.3672 22.5859 14.5332 23.0098 13.5762C23.4336 12.6191 23.6387 11.5938 23.625 10.5C23.625 9.41992 23.4199 8.40137 23.0098 7.44434C22.5996 6.4873 22.0391 5.65332 21.3281 4.94238C20.6172 4.23145 19.7764 3.66406 18.8057 3.24023C17.835 2.81641 16.8164 2.61133 15.75 2.625C14.6562 2.625 13.6377 2.83008 12.6943 3.24023C11.751 3.65039 10.917 4.21094 10.1924 4.92188C9.46777 5.63281 8.90039 6.47363 8.49023 7.44434C8.08008 8.41504 7.875 9.43359 7.875 10.5ZM35.4375 15.75C36.3398 15.75 37.1875 15.9209 37.9805 16.2627C38.7734 16.6045 39.4639 17.0762 40.0518 17.6777C40.6396 18.2793 41.1113 18.9766 41.4668 19.7695C41.8223 20.5625 42 21.4102 42 22.3125C42 23.2148 41.8291 24.0625 41.4873 24.8555C41.1455 25.6484 40.6738 26.3457 40.0723 26.9473C39.4707 27.5488 38.7734 28.0205 37.9805 28.3623C37.1875 28.7041 36.3398 28.875 35.4375 28.875C35.123 28.875 34.8154 28.8545 34.5146 28.8135L22.4766 40.8516C22.1074 41.2207 21.6836 41.501 21.2051 41.6924C20.7266 41.8838 20.2207 41.9863 19.6875 42C19.1406 42 18.6279 41.8975 18.1494 41.6924C17.6709 41.4873 17.2539 41.207 16.8984 40.8516C16.543 40.4961 16.2627 40.0791 16.0576 39.6006C15.8525 39.1221 15.75 38.6094 15.75 38.0625C15.75 37.543 15.8457 37.0439 16.0371 36.5654C16.2285 36.0869 16.5156 35.6562 16.8984 35.2734L28.9365 23.2354C28.8955 22.9346 28.875 22.627 28.875 22.3125C28.875 21.4102 29.0459 20.5625 29.3877 19.7695C29.7295 18.9766 30.1943 18.2861 30.7822 17.6982C31.3701 17.1104 32.0674 16.6387 32.874 16.2832C33.6807 15.9277 34.5352 15.75 35.4375 15.75ZM35.4375 26.25C35.9844 26.25 36.4971 26.1475 36.9756 25.9424C37.4541 25.7373 37.8711 25.457 38.2266 25.1016C38.582 24.7461 38.8623 24.3291 39.0674 23.8506C39.2725 23.3721 39.375 22.8594 39.375 22.3125C39.375 21.752 39.2451 21.1914 38.9854 20.6309L35.9912 23.625H34.125V21.7588L37.1191 18.7646C36.5586 18.5049 35.998 18.375 35.4375 18.375C34.8906 18.375 34.3779 18.4775 33.8994 18.6826C33.4209 18.8877 33.0039 19.168 32.6484 19.5234C32.293 19.8789 32.0127 20.2959 31.8076 20.7744C31.6025 21.2529 31.5 21.7656 31.5 22.3125C31.5 22.873 31.6299 23.4336 31.8896 23.9941L18.7646 37.1396C18.5049 37.3994 18.375 37.707 18.375 38.0625C18.375 38.418 18.5049 38.7256 18.7646 38.9854C19.0244 39.2451 19.332 39.375 19.6875 39.375C20.043 39.375 20.3506 39.2451 20.6104 38.9854L33.7559 25.8604C34.3164 26.1201 34.877 26.25 35.4375 26.25Z" fill="#0B3AB1"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_236_633">
                        <rect width="42" height="42" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>`,
                title: 'Layanan Lengkap',
                description: 'Menyediakan layanan lengkap mulai dari konsultasi hingga penerbitan sertifikat SLF',
            },
            {
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                    <path d="M20.6996 4.59998C18.2596 4.59998 15.9196 5.56926 14.1942 7.29459C12.4689 9.01993 11.4996 11.36 11.4996 13.8C11.4996 16.24 12.4689 18.58 14.1942 20.3054C15.9196 22.0307 18.2596 23 20.6996 23C23.1396 23 25.4797 22.0307 27.205 20.3054C28.9303 18.58 29.8996 16.24 29.8996 13.8C29.8996 11.36 28.9303 9.01993 27.205 7.29459C25.4797 5.56926 23.1396 4.59998 20.6996 4.59998ZM13.7996 13.8C13.7996 11.97 14.5266 10.2149 15.8206 8.92094C17.1146 7.62694 18.8696 6.89998 20.6996 6.89998C22.5296 6.89998 24.2846 7.62694 25.5786 8.92094C26.8726 10.2149 27.5996 11.97 27.5996 13.8C27.5996 15.63 26.8726 17.385 25.5786 18.679C24.2846 19.973 22.5296 20.7 20.6996 20.7C18.8696 20.7 17.1146 19.973 15.8206 18.679C14.5266 17.385 13.7996 15.63 13.7996 13.8ZM9.22031 25.3C8.61449 25.2972 8.0141 25.4142 7.45361 25.6442C6.89312 25.8741 6.38357 26.2125 5.95423 26.6399C5.52488 27.0674 5.1842 27.5754 4.95173 28.1348C4.71927 28.6943 4.5996 29.2941 4.59961 29.9C4.59961 33.7893 6.51551 36.7218 9.51011 38.6331C12.4587 40.5122 16.4331 41.4 20.6996 41.4C21.6457 41.4 22.5733 41.3563 23.4826 41.2689C22.9338 40.5856 22.4574 39.8472 22.0612 39.0655C21.615 39.0885 21.1611 39.1 20.6996 39.1C16.7091 39.1 13.2085 38.2628 10.7475 36.6919C8.33251 35.1509 6.89961 32.913 6.89961 29.9C6.89961 28.6281 7.93001 27.6 9.22031 27.6H22.0773C22.502 26.775 23.0065 26.0084 23.5907 25.3H9.22031ZM43.6996 33.35C43.6996 36.095 42.6092 38.7275 40.6682 40.6685C38.7272 42.6095 36.0946 43.7 33.3496 43.7C30.6046 43.7 27.9721 42.6095 26.0311 40.6685C24.0901 38.7275 22.9996 36.095 22.9996 33.35C22.9996 30.605 24.0901 27.9724 26.0311 26.0314C27.9721 24.0904 30.6046 23 33.3496 23C36.0946 23 38.7272 24.0904 40.6682 26.0314C42.6092 27.9724 43.6996 30.605 43.6996 33.35ZM34.4444 27.278C34.378 27.0387 34.235 26.8277 34.0372 26.6774C33.8395 26.5271 33.598 26.4457 33.3496 26.4457C33.1012 26.4457 32.8597 26.5271 32.662 26.6774C32.4643 26.8277 32.3212 27.0387 32.2548 27.278L31.1577 30.8016H27.5996C26.4864 30.8016 26.0218 32.2897 26.9234 32.9728L29.7984 35.1509L28.7013 38.6745C28.3563 39.7785 29.5707 40.6985 30.4723 40.0154L33.3473 37.8373L36.2223 40.0154C37.1239 40.6985 38.3383 39.7785 37.9933 38.6745L36.8962 35.1509L39.7712 32.9728C40.6728 32.2897 40.2082 30.8016 39.095 30.8016H35.5415L34.4444 27.278Z" fill="#0B3AB1"/>
                </svg>`,
                title: 'Fokus pada Anda',
                description: 'Pelayanan yang berfokus pada kebutuhan klien dengan pendekatan personal dan solusi terbaik',
            },
        ],
    };

    const roadmapData = {
        subtitle: 'Roadmap',
        title: 'Proses Audit Struktur Kami',
        steps: [
            {
                number: 1,
                title: 'Konsultasi Gratis',
                description: 'Konsultasi mengenai kebutuhan SLF sesuai dengan kondisi bangunan Anda',
                variant: 'blue',
            },
            {
                number: 2,
                title: 'Kajian Teknis',
                description: 'Survey lapangan & audit struktur untuk mengetahui kondisi bangunan',
                variant: 'white',
            },
            { number: 3, title: 'Pengajuan Resmi', description: 'Pengajuan berkas resmi ke dinas terkait untuk proses sertifikasi', variant: 'blue' },
            { number: 4, title: 'Penyusunan Dokumen', description: 'Penyusunan dokumen lengkap sesuai persyaratan sertifikasi', variant: 'white' },
            { number: 5, title: 'SLF Terbit', description: 'Sertifikat Laik Fungsi resmi terbit & siap digunakan', variant: 'blue' },
        ],
        topCount: 3,
        bgFrom: '#DBF9FF',
        bgTo: '#E8F8FF',
        bottomMaxWidth: 'max-w-3xl',
    };

    return (
        <>
            <Head title={seo?.title || 'Jasa Pengurusan Sertifikat Laik Fungsi (SLF)'}>
                {/* Meta from controller */}
                <meta name="description" content={seo?.description || ''} />
                <meta name="keywords" content={seo?.keywords?.join(', ') || ''} />
                {/* JSON-LD Schema.org */}
                <script type="application/ld+json">{JSON.stringify(seo?.jsonLd || {})}</script>

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-XEPGPGERHZ');
`,
                    }}
                />
            </Head>
            <div className="min-h-screen font-mons" ref={containerRef}>
                <Header heroContent={slfHeroContent} />

                <AboutServiceSection {...slfAboutData} />

                <WhyNeedSection {...whyNeedSLFData} />

                <AdvantageSection {...advantageData} />

                {/* Section Roadmap Proses Audit Struktur */}
                <RoadmapSection
                    subtitle={roadmapData.subtitle}
                    title={roadmapData.title}
                    steps={roadmapData.steps.map((step) => ({
                        number: step.number,
                        title: step.title,
                        description: step.description,
                        variant: step.variant as 'blue' | 'white' | undefined,
                    }))}
                    topCount={roadmapData.topCount}
                    bgFrom={roadmapData.bgFrom}
                    bgTo={roadmapData.bgTo}
                    bottomMaxWidth={roadmapData.bottomMaxWidth}
                />

                <CtaBannerSection
                    bgImage="/img/general/bg-mitra.webp"
                    containerMaxWidth="max-w-7xl"
                    leftImageSrc="/img/general/slf-cta.webp"
                    leftImageAlt="SLF CTA"
                    titleParts={['Proses Mudah,', 'Hasil', 'Maksimal']}
                    description="Jangan tunda lagi! Setiap hari tanpa SLF adalah risiko besar bagi bangunan Anda. Hubungi kami sekarang dan wujudkan bangunan yang aman, legal, dan bernilai tinggi."
                    buttonLabel="Konsultasi Gratis"
                    buttonHref="https://wa.me/6285117635738?text=Halo%20Retro%2C%20saya%20ingin%20konsultasi"
                    containerBgClass="bg-[#0B3AB1]"
                    textBgClass="bg-[#0B3AB1] lg:bg-transparent"
                />

                <Footer />
            </div>
        </>
    );
}

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    jsonLd?: Record<string, unknown>;
}

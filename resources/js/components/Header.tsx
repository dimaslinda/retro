import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface HeroContent {
    title: string;
    description: string;
    buttonText: string;
    buttonAction?: () => void;
    backgroundImage?: string;
}

interface HeaderProps {
    heroContent?: HeroContent;
}

export default function Header({ heroContent }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileDropdownRef = useRef<HTMLDivElement>(null);

    // Default hero content
    const defaultHeroContent: HeroContent = {
        title: 'BANGUN LEBIH AMAN,\nEFISIEN, DAN SESUAI\nREGULASI',
        description:
            'Retro Hadir sebagai mitra terpercaya dalam memberikan solusi SLF dan K3 PU. Kami memiliki pengalaman dan komitmen untuk memberikan layanan terbaik dengan standar yang tinggi dan sesuai regulasi.',
        buttonText: 'KONSULTASI SEKARANG',
        backgroundImage: '/img/general/banner.webp',
    };

    const currentHeroContent = heroContent || defaultHeroContent;

    // Determine current path for active states
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const isNavActive = (href: string) => currentPath === href;
    const isServicesActive = currentPath.startsWith('/layanan');
    const isActiveSLF = currentPath.startsWith('/layanan/slf');
    const isActivePBG = currentPath.startsWith('/layanan/pbg');

    // Close dropdown when clicking outside (supports desktop and mobile dropdown containers)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            const insideDesktop = dropdownRef.current?.contains(target) ?? false;
            const insideMobile = mobileDropdownRef.current?.contains(target) ?? false;

            if (!insideDesktop && !insideMobile) {
                setIsServicesDropdownOpen(false);
            }
        }

        // Use 'click' instead of 'mousedown' so onClick toggles run first
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="lg:p-4 xl:p-10">
            {/* Hero Section with Background */}
            <div
                className="relative min-h-screen bg-cover bg-center bg-no-repeat lg:rounded-3xl"
                style={{
                    backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.00) 21.06%, rgba(0, 0, 0, 0.58) 100%), url('${currentHeroContent.backgroundImage || defaultHeroContent.backgroundImage}')`,
                }}
            >
                {/* Navigation Bar */}
                <nav className="relative z-10 bg-transparent pt-0">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-start justify-between p-6 lg:p-0">
                            {/* Logo */}
                            <div className="flex items-center pt-3 pl-10">
                                <img src="/img/general/logo.webp" alt="PT. Retro Konsultan" className="h-10 w-auto xl:h-15" />
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden flex-1 items-start justify-center lg:flex">
                                <div
                                    className="relative bg-cover bg-center bg-no-repeat px-15 py-3"
                                    style={{
                                        backgroundImage: "url('/img/general/navbar.webp')",
                                    }}
                                >
                                    <div className="flex items-center space-x-8">
                                        <a
                                            href="/"
                                            className={`text-lg font-semibold tracking-wide uppercase transition-colors ${isNavActive('/') ? 'text-[#0B3AB1]' : 'text-gray-700 hover:text-blue-600'}`}
                                        >
                                            BERANDA
                                        </a>
                                        <a
                                            href="/#tentang-kami"
                                            className={`text-lg font-semibold tracking-wide text-gray-700 uppercase transition-colors hover:text-blue-600`}
                                        >
                                            TENTANG KAMI
                                        </a>
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                                                className={`flex items-center text-lg font-semibold tracking-wide uppercase transition-colors ${isServicesActive ? 'text-[#0B3AB1]' : 'text-gray-700 hover:text-blue-600'}`}
                                            >
                                                LAYANAN KAMI
                                                <svg
                                                    className={`ml-1 h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {/* Dropdown Menu */}
                                            {isServicesDropdownOpen && (
                                                <div className="absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
                                                    <div className="py-2">
                                                        <Link
                                                            href="/layanan/slf"
                                                            className={`block px-4 py-2 text-sm transition-colors ${isActiveSLF ? 'bg-blue-50 text-[#0B3AB1]' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                                                        >
                                                            SLF (Sertifikat Laik Fungsi)
                                                        </Link>
                                                        <Link
                                                            href="/layanan/pbg"
                                                            className={`block px-4 py-2 text-sm transition-colors ${isActivePBG ? 'bg-blue-50 text-[#0B3AB1]' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                                                        >
                                                            PBG (Persetujuan Bangunan Gedung)
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="hidden items-center space-x-3 p-5 lg:flex">
                                <a
                                    href="https://wa.me/6285117635738?text=Halo%20Retro%2C%20saya%20ingin%20konsultasi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                                >
                                    <svg className="h-4 w-4 xl:h-7 xl:w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.868-2.031-.967-.273-.099-.472-.149-.672.149-.198.297-.771.967-.945 1.165-.173.199-.346.223-.643.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.346.446-.52.149-.174.198-.297.298-.495.099-.198.05-.372-.025-.521-.074-.149-.672-1.612-.921-2.206-.242-.579-.487-.5-.672-.51l-.572-.01c-.198 0-.52.074-.792.372s-1.039 1.016-1.039 2.479 1.064 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.26.489 1.689.625.709.226 1.354.195 1.865.118.569-.085 1.758-.718 2.007-1.414.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.353 7.709h-.003a11.768 11.768 0 01-5.999-1.633l-.43-.255-3.555.921.949-3.464-.279-.355a11.78 11.78 0 01-1.804-6.21c0-6.513 5.304-11.817 11.82-11.817 3.157 0 6.112 1.229 8.356 3.463a11.76 11.76 0 013.468 8.345c-.003 6.511-5.307 11.815-11.82 11.815m6.782-18.59A13.205 13.205 0 0011.998 0C5.373 0 .003 5.372 0 11.993a13.19 13.19 0 001.943 6.84L.012 24l5.305-1.392a13.17 13.17 0 006.781 1.861h.006c7.623 0 13.81-6.185 13.813-13.8a13.136 13.136 0 00-3.997-9.82" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/pt-retro-ciptaharsa-nawasena/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                                >
                                    <svg className="h-4 w-4 xl:h-7 xl:w-7" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.facebook.com/share/162qfnhdHW/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                                >
                                    <svg className="h-4 w-4 xl:h-7 xl:w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.09 4.388 23.159 10.125 24v-8.437H7.077V12.07h3.048V9.413c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.954.928-1.954 1.879v2.258h3.328l-.532 3.493h-2.796V24C19.612 23.159 24 18.09 24 12.073z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.instagram.com/retrokonsultan/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 xl:h-7 xl:w-7" viewBox="0 0 31 31" fill="none">
                                        <path
                                            d="M23.146 5.50085C22.206 5.50085 21.3516 6.26989 21.3516 7.29526C21.3516 8.23519 22.1206 9.08967 23.146 9.08967C24.0859 9.08967 24.9404 8.32064 24.9404 7.29526C24.8549 6.26989 24.0859 5.50085 23.146 5.50085Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M15.1996 7.81128C11.0981 7.81128 7.76562 11.1438 7.76562 15.2453C7.76562 19.3468 11.0981 22.6792 15.1996 22.6792C19.3011 22.6792 22.6336 19.3468 22.6336 15.2453C22.719 11.1438 19.3011 7.81128 15.1996 7.81128ZM15.1996 20.0304C12.5507 20.0304 10.4145 17.8942 10.4145 15.2453C10.4145 12.5964 12.5507 10.4602 15.1996 10.4602C17.8485 10.4602 19.9847 12.5964 19.9847 15.2453C19.9847 17.8942 17.8485 20.0304 15.1996 20.0304Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M21.1814 30.369H9.04773C4.09174 30.369 -0.00976562 26.2675 -0.00976562 21.2261V9.17792C-0.00976562 4.13648 4.09174 0.120422 9.04773 0.120422H21.0959C26.1373 0.120422 30.1534 4.22193 30.1534 9.17792V21.2261C30.2389 26.2675 26.1373 30.369 21.1814 30.369ZM9.04773 2.94021C5.62981 2.94021 2.81002 5.75999 2.81002 9.17792V21.2261C2.81002 24.644 5.62981 27.4638 9.04773 27.4638H21.0959C24.5138 27.4638 27.3336 24.644 27.3336 21.2261V9.17792C27.3336 5.75999 24.5138 2.94021 21.0959 2.94021H9.04773Z"
                                            fill="white"
                                        />
                                    </svg>
                                </a>
                            </div>

                            {/* Mobile menu button */}
                            <div className="lg:hidden">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-100 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        {isMenuOpen && (
                            <div className="lg:hidden">
                                <div className="space-y-1 border-t bg-white px-2 pt-2 pb-3 sm:px-3">
                                    <a
                                        href="/"
                                        className={`block px-3 py-2 font-semibold ${isNavActive('/') ? 'text-[#0B3AB1]' : 'text-gray-700 hover:text-blue-600'}`}
                                    >
                                        BERANDA
                                    </a>
                                    <a href="#tentang-kami" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                                        TENTANG KAMI
                                    </a>

                                    {/* Mobile Services Dropdown */}
                                    <div ref={mobileDropdownRef}>
                                        <button
                                            onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                                            className="flex w-full items-center justify-between px-3 py-2 text-gray-700 hover:text-blue-600"
                                        >
                                            LAYANAN KAMI
                                            <svg
                                                className={`h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Mobile Dropdown Items */}
                                        {isServicesDropdownOpen && (
                                            <div className="ml-4 space-y-1">
                                                <Link
                                                    href="/layanan/slf"
                                                    className={`block px-3 py-2 text-sm transition-colors ${isActiveSLF ? 'text-[#0B3AB1]' : 'text-gray-600 hover:text-blue-600'}`}
                                                >
                                                    SLF (Sertifikat Laik Fungsi)
                                                </Link>
                                                <Link
                                                    href="/layanan/pbg"
                                                    className={`block px-3 py-2 text-sm transition-colors ${isActivePBG ? 'text-[#0B3AB1]' : 'text-gray-600 hover:text-blue-600'}`}
                                                >
                                                    PBG (Persetujuan Bangunan Gedung)
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Hero Content - Now Dynamic */}
                <div className="relative flex min-h-[calc(100vh-4rem)] justify-center px-4 pt-10 sm:px-6 md:items-center md:pt-0 lg:px-8">
                    <div className="mx-auto w-full max-w-7xl">
                        <div className="max-w-3xl">
                            <h1 className="mb-6 text-3xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
                                {currentHeroContent.title.split('\n').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        {index < currentHeroContent.title.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </h1>
                            <p className="mb-8 text-lg leading-relaxed text-white/90 sm:text-xl">{currentHeroContent.description}</p>
                            <a
                                href="https://wa.me/6285117635738?text=Halo%20Retro%2C%20saya%20ingin%20konsultasi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-blue-700 hover:shadow-xl"
                            >
                                {currentHeroContent.buttonText || 'KONSULTASI SEKARANG'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

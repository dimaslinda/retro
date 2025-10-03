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

    // Default hero content
    const defaultHeroContent: HeroContent = {
        title: "BANGUN LEBIH AMAN,\nEFISIEN, DAN SESUAI\nREGULASI",
        description: "Retro Hadir sebagai mitra terpercaya dalam memberikan solusi SLF dan K3 PU. Kami memiliki pengalaman dan komitmen untuk memberikan layanan terbaik dengan standar yang tinggi dan sesuai regulasi.",
        buttonText: "KONSULTASI SEKARANG",
        backgroundImage: "/img/general/banner.png"
    };

    const currentHeroContent = heroContent || defaultHeroContent;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsServicesDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleButtonClick = () => {
        if (currentHeroContent.buttonAction) {
            currentHeroContent.buttonAction();
        } else {
            // Default action - bisa disesuaikan
            console.log('Default button action');
        }
    };

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
                            <div className="flex items-center pl-10 pt-3">
                                <img src="/img/general/logo.png" alt="Retro Ciptakarsa Nusantara" className="h-10 w-auto xl:h-15" />
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden flex-1 items-start justify-center lg:flex">
                                <div
                                    className="relative bg-cover bg-center bg-no-repeat px-15 py-3"
                                    style={{
                                        backgroundImage: "url('/img/general/navbar.png')",
                                    }}
                                >
                                    <div className="flex items-center space-x-8">
                                        <a
                                            href="/"
                                            className="text-lg font-semibold tracking-wide text-blue-600 uppercase transition-colors hover:text-blue-700"
                                        >
                                            BERANDA
                                        </a>
                                        <a
                                            href="#"
                                            className="text-lg font-medium tracking-wide text-gray-700 uppercase transition-colors hover:text-blue-600"
                                        >
                                            TENTANG KAMI
                                        </a>
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                                                className="flex items-center text-lg font-medium tracking-wide text-gray-700 uppercase transition-colors hover:text-blue-600"
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
                                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            SLF (Sertifikat Laik Fungsi)
                                                        </Link>
                                                        <Link
                                                            href="/layanan/pbg"
                                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            PBG (Persetujuan Bangunan Gedung)
                                                        </Link>
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            DED (Detail Engineering Design)
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            Audit Struktur
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            Manajemen Konstruksi
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="hidden items-center space-x-3 p-5 lg:flex">
                                <a href="#" className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a href="#" className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="#" className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                                    </svg>
                                </a>
                                <a href="#" className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.004 2.622c-3.23 0-3.631.012-4.895.07-1.26.058-2.122.26-2.871.555-.777.3-1.439.703-2.097 1.361-.658.658-1.061 1.32-1.361 2.097-.295.749-.497 1.611-.555 2.871-.058 1.264-.07 1.665-.07 4.895s.012 3.631.07 4.895c.058 1.26.26 2.122.555 2.871.3.777.703 1.439 1.361 2.097.658.658 1.32 1.061 2.097 1.361.749.295 1.611.497 2.871.555 1.264.058 1.665.07 4.895.07s3.631-.012 4.895-.07c1.26-.058 2.122-.26 2.871-.555.777-.3 1.439-.703 2.097-1.361.658-.658 1.061-1.32 1.361-2.097.295-.749.497-1.611.555-2.871.058-1.264.07-1.665.07-4.895s-.012-3.631-.07-4.895c-.058-1.26-.26-2.122-.555-2.871-.3-.777-.703-1.439-1.361-2.097-.658-.658-1.32-1.061-2.097-1.361-.749-.295-1.611-.497-2.871-.555-1.264-.058-1.665-.07-4.895-.07zm0 2.163c3.204 0 3.584.012 4.85.07 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.06 1.265.072 1.646.072 4.85s-.012 3.584-.072 4.849c-.053 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.419.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.265.06-1.646.072-4.85.072s-3.584-.012-4.849-.072c-1.17-.053-1.805-.249-2.228-.413-.562-.217-.96-.477-1.382-.896-.419-.419-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.06-1.265-.072-1.646-.072-4.85s.012-3.584.072-4.849c.053-1.17.249-1.805.413-2.228.217-.562.477-.96.896-1.382.419-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.06 1.646-.072 4.85-.072z" />
                                        <circle cx="12.004" cy="12.004" r="3.592" />
                                        <circle cx="18.406" cy="5.596" r="1.144" />
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
                                    <a href="/" className="block px-3 py-2 font-semibold text-blue-600">
                                        BERANDA
                                    </a>
                                    <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                                        TENTANG KAMI
                                    </a>

                                    {/* Mobile Services Dropdown */}
                                    <div>
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
                                                <Link href="/layanan/slf" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">
                                                    SLF (Sertifikat Laik Fungsi)
                                                </Link>
                                                <Link href="/layanan/pbg" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">
                                                    PBG (Persetujuan Bangunan Gedung)
                                                </Link>
                                                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">
                                                    DED (Detail Engineering Design)
                                                </a>
                                                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">
                                                    Audit Struktur
                                                </a>
                                                <a href="#" className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">
                                                    Manajemen Konstruksi
                                                </a>
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
                            <p className="mb-8 text-lg leading-relaxed text-white/90 sm:text-xl">
                                {currentHeroContent.description}
                            </p>
                            <button 
                                onClick={handleButtonClick}
                                className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-blue-700 hover:shadow-xl"
                            >
                                {currentHeroContent.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

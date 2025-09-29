import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';
import About from '../components/About';
import Articles from '../components/Articles';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Magazine from '../components/Magazine';
import ProjectEstimation from '../components/ProjectEstimation';
import StrategicPartner from '../components/StrategicPartner';

export default function Index() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const totalSlides = 5;

    // Touch/Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    // Tetapkan jumlah kartu yang ditampilkan ke 3 untuk desktop
    const cardsPerView = 3;
    const maxSlideIndex = totalSlides - cardsPerView;

    const goToSlide = useCallback((slideIndex: number) => {
        if (sliderRef.current) {
            // Pastikan lebar kartu dan gap konsisten dengan CSS
            const cardWidth = 300; // lebar kartu yang sesuai
            const gap = 24; // gap antar kartu
            const slideWidth = cardWidth + gap;
            const translateX = -slideIndex * slideWidth;

            gsap.to(sliderRef.current, {
                x: translateX,
                duration: 0.8,
                ease: 'power3.out',
            });

            setCurrentSlide(slideIndex);
        }
    }, []);

    const nextSlide = () => {
        const nextIndex = currentSlide >= maxSlideIndex ? 0 : currentSlide + 1;
        goToSlide(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = currentSlide <= 0 ? maxSlideIndex : currentSlide - 1;
        goToSlide(prevIndex);
    };

    // Touch/Drag handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;

        const newCurrentX = e.touches[0].clientX;
        setCurrentX(newCurrentX);
        const diff = newCurrentX - startX;
        setDragOffset(diff);

        // Apply drag effect
        if (sliderRef.current) {
            // Pastikan lebar kartu dan gap konsisten dengan CSS
            const cardWidth = 300; // lebar kartu yang sesuai
            const gap = 24; // gap antar kartu
            const slideWidth = cardWidth + gap;
            const baseTranslateX = -currentSlide * slideWidth;

            gsap.set(sliderRef.current, {
                x: baseTranslateX + diff,
            });
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);
        const threshold = 50; // minimum drag distance to trigger slide change

        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset > 0) {
                // Dragged right - go to previous slide
                prevSlide();
            } else {
                // Dragged left - go to next slide
                nextSlide();
            }
        } else {
            // Snap back to current slide
            goToSlide(currentSlide);
        }

        setDragOffset(0);
    };

    // Mouse handlers for desktop drag support
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.clientX);
        setCurrentX(e.clientX);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging) {
                nextSlide();
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [currentSlide, isDragging]);

    // Mouse event listeners for desktop drag
    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newCurrentX = e.clientX;
                setCurrentX(newCurrentX);
                const diff = newCurrentX - startX;
                setDragOffset(diff);

                if (sliderRef.current) {
                    const cardWidth = 300;
                    const gap = 24;
                    const slideWidth = cardWidth + gap;
                    const baseTranslateX = -currentSlide * slideWidth;
                    gsap.set(sliderRef.current, { x: baseTranslateX + diff });
                }
            }
        };

        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                const threshold = 50;

                if (Math.abs(dragOffset) > threshold) {
                    if (dragOffset > 0) {
                        prevSlide();
                    } else {
                        nextSlide();
                    }
                } else {
                    goToSlide(currentSlide);
                }

                setDragOffset(0);
            }
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isDragging, startX, dragOffset, currentSlide]);

    // GSAP animations for magazine images
    useEffect(() => {
        const magazineCards = document.querySelectorAll('.magazine-card');

        // Initial animation on load - staggered entrance
        gsap.fromTo(
            magazineCards,
            {
                opacity: 0,
                y: 60,
                scale: 0.8,
                rotationY: 15,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
            },
        );

        // Hover animations for magazine images
        magazineCards.forEach((card) => {
            const cardElement = card as HTMLElement;
            const img = cardElement.querySelector('img');

            cardElement.addEventListener('mouseenter', () => {
                // Animate the image with 3D effect
                if (img) {
                    gsap.to(img, {
                        scale: 1.08,
                        rotationY: -5,
                        rotationX: 5,
                        y: -8,
                        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
            });

            cardElement.addEventListener('mouseleave', () => {
                // Reset image to original state
                if (img) {
                    gsap.to(img, {
                        scale: 1,
                        rotationY: 0,
                        rotationX: 0,
                        y: 0,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
            });
        });

        // Cleanup function
        return () => {
            magazineCards.forEach((card) => {
                const cardElement = card as HTMLElement;
                cardElement.removeEventListener('mouseenter', () => {});
                cardElement.removeEventListener('mouseleave', () => {});
            });
        };
    }, []);

    return (
        <>
            <Head title="Retro Ciptakarsa Nusantara">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen font-mons">
                {/* Header Component */}
                <Header />
                {/* About Component */}
                <About />
                {/* Project Estimation Component */}
                <ProjectEstimation />

                {/* Mitra Strategis Section */}
                <StrategicPartner />

                {/* Artikel Section */}
                <Articles />

                {/* Magazine Section */}
                <Magazine />

                <Footer />
            </div>
        </>
    );
}

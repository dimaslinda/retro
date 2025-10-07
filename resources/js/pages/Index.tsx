import { Head } from '@inertiajs/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import About from '../components/About';
import Articles from '../components/Articles';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Magazine from '../components/Magazine';
import ProjectEstimation from '../components/ProjectEstimation';
import StrategicPartner from '../components/StrategicPartner';

interface IndexProps {
    articles?: WPPost[] | null;
    articlesError?: string | null;
}

interface WPImageSize {
    source_url?: string;
}
interface WPFeaturedMedia {
    alt_text?: string;
    source_url?: string;
    media_details?: { sizes?: Record<string, WPImageSize> };
}
interface WPPost {
    id?: number;
    date?: string;
    link?: string;
    title?: { rendered?: string };
    excerpt?: { rendered?: string };
    _embedded?: { ['wp:featuredmedia']?: WPFeaturedMedia[] };
}

export default function Index({ articles, articlesError }: IndexProps) {
    const containerRef = useRef<HTMLDivElement>(null);

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

    // GSAP scroll reveal effects applied across page sections and common child elements
    useEffect(() => {
        if (!containerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const sections = Array.from(containerRef.current.children) as HTMLElement[];

        sections.forEach((section) => {
            // Reveal each section on scroll without hiding (no opacity changes)
            gsap.from(section, {
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                immediateRender: false,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
            });

            // Stagger reveal for text-only child elements (exclude images and card containers)
            const items = gsap.utils.toArray<HTMLElement>(
                section.querySelectorAll('h1, h2, h3, p, a, button, li'),
            );
            if (items.length) {
                gsap.from(items, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power2.out',
                    immediateRender: false,
                    clearProps: 'transform,opacity',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 92%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
            gsap.killTweensOf(sections);
        };
    }, []);

    return (
        <>
            <Head title="Retro Ciptakarsa Nusantara">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen font-mons" ref={containerRef}>
                {/* Header Component */}
                <Header />
                {/* About Component */}
                <About />
                {/* Project Estimation Component */}
                <ProjectEstimation />

                {/* Mitra Strategis Section */}
                <StrategicPartner />

                {/* Artikel Section */}
                <Articles articles={articles} articlesError={articlesError} />

                {/* Magazine Section */}
                <Magazine />

                <Footer />
            </div>
        </>
    );
}

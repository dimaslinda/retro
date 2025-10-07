import React, { useState } from 'react';

// TypeScript interfaces for WordPress post and media
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

interface ArticlesProps {
    articles?: WPPost[] | null;
    articlesError?: string | null;
}

const stripHtml = (html?: string): string => {
    if (!html) return '';
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();
};

// Add helper to get featured image from WordPress _embedded payload
const getFeaturedImage = (post: WPPost, variant: 'hero' | 'card' = 'card'): { url: string; alt: string } => {
    const media = post?._embedded?.['wp:featuredmedia']?.[0];
    const sizes = media?.media_details?.sizes || {};
    const alt = media?.alt_text || stripHtml(post?.title?.rendered) || 'Featured image';
    const heroPick = sizes?.full?.source_url || sizes?.large?.source_url || sizes?.medium_large?.source_url || media?.source_url;
    const cardPick = sizes?.medium_large?.source_url || sizes?.large?.source_url || sizes?.thumbnail?.source_url || media?.source_url;
    const url = variant === 'hero' ? heroPick : cardPick;
    return { url: url || '', alt: alt || '' };
};

const Articles: React.FC<ArticlesProps> = ({ articles, articlesError }) => {
    const sorted = Array.isArray(articles) ? [...articles].sort((a, b) => new Date(b?.date || 0).getTime() - new Date(a?.date || 0).getTime()) : [];
    const latest = sorted.length > 0 ? sorted[0] : null;
    const others = sorted.length > 1 ? sorted.slice(1, 4) : [];
    const heroImage = latest ? getFeaturedImage(latest, 'hero') : { url: '', alt: '' };
    const [heroLoaded, setHeroLoaded] = useState(false);
    const [heroSharp, setHeroSharp] = useState(false);
    const [loadedCards, setLoadedCards] = useState<Record<string, boolean>>({});
    const [loadedCardsSharp, setLoadedCardsSharp] = useState<Record<string, boolean>>({});

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
                        <a
                            href="https://retrokonsultan.com/artikel/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex cursor-pointer items-center gap-3 rounded-lg bg-[#0B3AB1] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                        >
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
                        </a>
                    </div>
                </div>

                {articlesError && <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{articlesError}</div>}

                {!latest && !articlesError && (
                    <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
                        Belum ada artikel untuk ditampilkan.
                    </div>
                )}

                {/* Main Article */}
                {latest && (
                    <div className="relative overflow-hidden rounded-t-2xl">
                        <div className="absolute inset-0">
                            {/* Skeleton while hero image loads (brand-friendly color) */}
                            {!heroLoaded && <div className="h-full w-full animate-pulse bg-blue-100" />}
                            {/* Use featured image for the main article with blur-up */}
                            <img
                                src={heroImage.url || '/img/general/estimasi.png'}
                                alt={heroImage.alt || 'Artikel Utama'}
                                className={`h-full w-full object-cover filter transition-all duration-300 ${heroLoaded ? 'opacity-100' : 'opacity-0'} ${heroLoaded && !heroSharp ? 'blur-sm' : 'blur-0'}`}
                                loading="eager"
                                decoding="async"
                                onLoad={() => {
                                    setHeroLoaded(true);
                                    setTimeout(() => setHeroSharp(true), 150);
                                }}
                                onError={() => {
                                    setHeroLoaded(true);
                                    setTimeout(() => setHeroSharp(true), 150);
                                }}
                            />
                        </div>
                        <div className="relative py-32 md:py-80">
                            <div className="absolute top-5 left-2 max-w-3xl md:top-15">
                                {/* Text skeletons for hero content */}
                                {!heroLoaded ? (
                                    <div className="animate-pulse">
                                        <div className="mb-4 h-6 w-3/4 rounded bg-blue-100" />
                                        <div className="mb-2 h-4 w-full rounded bg-blue-100" />
                                        <div className="mb-2 h-4 w-11/12 rounded bg-blue-100" />
                                        <div className="mb-6 h-4 w-10/12 rounded bg-blue-100" />
                                        <div className="h-10 w-48 rounded bg-blue-100" />
                                    </div>
                                ) : (
                                    <>
                                        {/* <h3 className="mb-4 text-3xl font-bold text-white lg:text-4xl" dangerouslySetInnerHTML={{ __html: latest.title?.rendered || 'Artikel Terbaru' }} />
                                        <p className="mb-6 text-lg leading-relaxed text-blue-100">
                                            {stripHtml(latest.excerpt?.rendered)}
                                        </p> */}
                                        <a
                                            href={latest.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex cursor-pointer items-center rounded-lg bg-cyan-400 px-6 py-3 font-medium text-blue-900 transition-colors duration-200 hover:bg-cyan-300"
                                        >
                                            BACA SELENGKAPNYA
                                            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Article Cards */}
                {others.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 rounded-b-2xl bg-[#0B3AB1] p-6 md:grid-cols-2 lg:grid-cols-3">
                        {others.map((post, idx) => (
                            <div
                                key={post?.id ?? idx}
                                className="group overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                            >
                                <div className="relative">
                                    {/* Use featured image for other articles with skeleton and blur-up lazy-loading */}
                                    {(() => {
                                        const imgData = getFeaturedImage(post, 'card');
                                        const keyId = String(post?.id ?? idx);
                                        const isLoaded = loadedCards[keyId] === true;
                                        const isSharp = loadedCardsSharp[keyId] === true;
                                        const markLoaded = () => {
                                            setLoadedCards((prev) => ({ ...prev, [keyId]: true }));
                                            setTimeout(() => setLoadedCardsSharp((prev) => ({ ...prev, [keyId]: true })), 150);
                                        };
                                        return (
                                            <>
                                                {!isLoaded && <div className="h-48 w-full animate-pulse bg-blue-100" />}
                                                <img
                                                    src={imgData.url || '/img/general/layanan.png'}
                                                    alt={imgData.alt || `Artikel ${idx + 1}`}
                                                    className={`h-64 w-full object-cover filter transition-all duration-300 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isLoaded && !isSharp ? 'blur-sm' : 'blur-0'}`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    onLoad={markLoaded}
                                                    onError={markLoaded}
                                                />
                                            </>
                                        );
                                    })()}
                                    <div className="absolute top-4 left-4">
                                        <a
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center rounded-lg bg-[#5BDFFB] px-4 py-2 text-sm font-medium text-blue-900 transition-colors duration-200 hover:bg-cyan-300"
                                        >
                                            Baca Selengkapnya
                                            <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {/* Text skeletons for card content */}
                                    {(() => {
                                        const keyId = String(post?.id ?? idx);
                                        const isLoaded = loadedCards[keyId] === true;
                                        if (!isLoaded) {
                                            return (
                                                <div className="animate-pulse">
                                                    <div className="mb-3 h-5 w-3/4 rounded bg-blue-100" />
                                                    <div className="mb-2 h-3 w-full rounded bg-blue-100" />
                                                    <div className="mb-2 h-3 w-11/12 rounded bg-blue-100" />
                                                    <div className="h-3 w-10/12 rounded bg-blue-100" />
                                                </div>
                                            );
                                        }
                                        return (
                                            <>
                                                <h4
                                                    className="mb-3 text-xl font-bold text-gray-900"
                                                    dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Judul Artikel' }}
                                                />
                                                <p className="mb-6 line-clamp-3 leading-relaxed text-gray-600">{stripHtml(post.excerpt?.rendered)}</p>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Articles;

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class LayananController extends Controller
{
    /**
     * Halaman layanan SLF dengan SEO meta dan Schema.org
     */
    public function slf(Request $request): Response
    {
        $baseUrl = config('app.url') ?: $request->getSchemeAndHttpHost();

        $seo = [
            'title' => 'Jasa Pengurusan Sertifikat Laik Fungsi (SLF) - PT. Retro Konsultan',
            'description' => 'Urus SLF bangunan cepat, aman, dan sesuai regulasi. Pendampingan penuh audit struktur, proteksi kebakaran, kenyamanan penghuni, hingga sertifikat terbit.',
            'keywords' => [
                'SLF', 'Sertifikat Laik Fungsi', 'pengurusan SLF', 'jasa SLF', 'konsultan sipil', 'legalitas bangunan', 'audit struktur'
            ],
            'jsonLd' => [
                '@context' => 'https://schema.org',
                '@type' => 'Service',
                'name' => 'Pengurusan Sertifikat Laik Fungsi (SLF)',
                'serviceType' => 'Sertifikat Laik Fungsi (SLF)',
                'areaServed' => 'Indonesia',
                'provider' => [
                    '@type' => 'Organization',
                    'name' => 'PT. Retro Konsultan',
                    'url' => $baseUrl,
                    'logo' => rtrim($baseUrl, '/') . '/logo.svg'
                ],
                'url' => rtrim($baseUrl, '/') . '/layanan/slf',
                'offers' => [
                    '@type' => 'Offer',
                    'availability' => 'https://schema.org/InStock'
                ],
            ],
        ];

        return Inertia::render('layanan/SLF', [
            'seo' => $seo,
        ]);
    }

    /**
     * Halaman layanan PBG dengan SEO meta dan Schema.org
     */
    public function pbg(Request $request): Response
    {
        $baseUrl = config('app.url') ?: $request->getSchemeAndHttpHost();

        $seo = [
            'title' => 'Jasa Pengurusan PBG (Persetujuan Bangunan Gedung) - PT. Retro Konsultan',
            'description' => 'Pendampingan lengkap urus PBG: standar teknis, kesesuaian tata ruang, jaminan legalitas bangunan. Proses cepat dan pasti.',
            'keywords' => [
                'PBG', 'Persetujuan Bangunan Gedung', 'pengurusan PBG', 'jasa PBG', 'izin bangunan', 'legalitas bangunan', 'konsultan sipil'
            ],
            'jsonLd' => [
                '@context' => 'https://schema.org',
                '@type' => 'Service',
                'name' => 'Pengurusan PBG (Persetujuan Bangunan Gedung)',
                'serviceType' => 'Persetujuan Bangunan Gedung (PBG)',
                'areaServed' => 'Indonesia',
                'provider' => [
                    '@type' => 'Organization',
                    'name' => 'PT. Retro Konsultan',
                    'url' => $baseUrl,
                    'logo' => rtrim($baseUrl, '/') . '/logo.svg'
                ],
                'url' => rtrim($baseUrl, '/') . '/layanan/pbg',
                'offers' => [
                    '@type' => 'Offer',
                    'availability' => 'https://schema.org/InStock'
                ],
            ],
        ];

        return Inertia::render('layanan/PBG', [
            'seo' => $seo,
        ]);
    }
}
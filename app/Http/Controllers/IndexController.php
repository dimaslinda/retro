<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * Display the index page.
     */
    public function index(Request $request): Response
    {
        $endpoint = env('WP_BASIC_ENDPOINT');
        $username = env('WP_BASIC_USER');
        $password = env('WP_BASIC_PASS');

        $articles = null;
        $articlesError = null;

        // SEO props for Index page
        $baseUrl = config('app.url') ?: $request->getSchemeAndHttpHost();
        $seo = [
            'title' => 'PT. Retro Konsultan - Konsultan Sipil & Perizinan Bangunan',
            'description' => 'Retro adalah mitra tepercaya untuk pengurusan SLF & PBG, audit struktur, dan konsultansi teknik sipil. Kami memastikan bangunan Anda aman, legal, dan sesuai regulasi.',
            'keywords' => [
                'Retro', 'Konsultan Sipil', 'SLF', 'PBG', 'Sertifikat Laik Fungsi', 'Persetujuan Bangunan Gedung', 'Audit Struktur', 'Legalitas Bangunan', 'K3 PU'
            ],
            'jsonLd' => [
                '@context' => 'https://schema.org',
                '@type' => 'Organization',
                'name' => 'PT. Retro Konsultan',
                'url' => $baseUrl,
                'logo' => rtrim($baseUrl, '/') . '/logo.svg',
                'sameAs' => [
                    'https://www.instagram.com/retrocn.id/',
                    'https://www.linkedin.com/company/pt-retro-ciptaharsa-nawasena/'
                ]
            ],
        ];

        if ($username && $password) {
            try {
                $promise = Http::withBasicAuth($username, $password)
                    ->acceptJson()
                    ->async()
                    ->get($endpoint);

                $response = $promise->wait();

                if ($response->successful()) {
                    $articles = $response->json();
                } else {
                    $articlesError = 'Gagal mengambil artikel dari WordPress';
                }
            } catch (\Throwable $e) {
                $articlesError = $e->getMessage();
            }
        } else {
            $articlesError = 'Konfigurasi Basic Auth WordPress belum diset (WP_BASIC_USER/WP_BASIC_PASS).';
        }

        return Inertia::render('Index', [
            'articles' => $articles,
            'articlesError' => $articlesError,
            'seo' => $seo,
        ]);
    }

    /**
     * Ambil artikel dari WordPress dengan Basic Auth secara async.
     */
    public function articles(): JsonResponse
    {
        $username = env('WP_BASIC_USER');
        $password = env('WP_BASIC_PASS');
        if (!$username || !$password) {
            return response()->json([
                'message' => 'Konfigurasi Basic Auth WordPress belum diset (WP_BASIC_USER/WP_BASIC_PASS).',
            ], 500);
        }

        $endpoint = 'https://retrokonsultan.id/artikel/wp-json/wp/v2/posts?_embed=1';

        try {
            $promise = Http::withBasicAuth($username, $password)
                ->acceptJson()
                ->async()
                ->get($endpoint);

            $response = $promise->wait();

            if (!$response->successful()) {
                return response()->json([
                    'message' => 'Gagal mengambil artikel dari WordPress',
                    'status' => $response->status(),
                    'body' => $response->json(),
                ], $response->status());
            }

            return response()->json($response->json());
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Kesalahan ketika mengambil artikel dari WordPress',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

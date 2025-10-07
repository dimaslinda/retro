<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;

class IndexController extends Controller
{
    /**
     * Display the index page.
     */
    public function index(): Response
    {
        $endpoint = env('WP_BASIC_ENDPOINT');
        $username = env('WP_BASIC_USER');
        $password = env('WP_BASIC_PASS');

        $articles = null;
        $articlesError = null;

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

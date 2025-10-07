<?php

use App\Http\Controllers\IndexController;
use App\Http\Controllers\FonnteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [IndexController::class, 'index'])->name('home');

use App\Http\Controllers\LayananController;

Route::get('/layanan/slf', [LayananController::class, 'slf'])->name('layanan.slf');

Route::get('/layanan/pbg', [LayananController::class, 'pbg'])->name('layanan.pbg');

Route::get('/api/articles', [IndexController::class, 'articles'])->name('api.articles');

Route::post('/api/slf-checklist/send', [FonnteController::class, 'sendSlfChecklist'])->name('slf.checklist.send');
Route::post('/api/pbg-checklist/send', [FonnteController::class, 'sendPbgChecklist'])->name('pbg.checklist.send');

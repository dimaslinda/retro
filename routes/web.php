<?php

use App\Http\Controllers\IndexController;
use App\Http\Controllers\FonnteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [IndexController::class, 'index'])->name('home');

Route::get('/layanan/slf', function () {
    return Inertia::render('layanan/SLF');
})->name('layanan.slf');

Route::get('/layanan/pbg', function () {
    return Inertia::render('layanan/PBG');
})->name('layanan.pbg');

Route::post('/api/slf-checklist/send', [FonnteController::class, 'sendSlfChecklist'])->name('slf.checklist.send');
Route::post('/api/pbg-checklist/send', [FonnteController::class, 'sendPbgChecklist'])->name('pbg.checklist.send');

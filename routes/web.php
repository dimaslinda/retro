<?php

use App\Http\Controllers\IndexController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [IndexController::class, 'index'])->name('home');
Route::get('/layanan/slf', function () {
    return Inertia::render('layanan/SLF');
})->name('layanan.slf');

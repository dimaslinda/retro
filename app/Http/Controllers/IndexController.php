<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class IndexController extends Controller
{
    /**
     * Display the index page.
     */
    public function index(): Response
    {
        return Inertia::render('Index');
    }
}
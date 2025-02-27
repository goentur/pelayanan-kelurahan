<?php

namespace App\Http\Controllers\Pengaturan;

use App\Http\Controllers\Controller;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Artisan;

class AplikasiController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('can:aplikasi-index', only: ['index']),
            new Middleware('can:aplikasi-update', only: ['update']),
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('aplikasi-gate-' . $user->getKey(), function () use ($user) {
            return [
                'update' => $user->can('aplikasi-update'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Pengaturan/Aplikasi/Index', compact("gate"));
    }

    /**
     * Optimize clear Aplication.
     */
    public function optimizeClear()
    {
        return Artisan::call('optimize:clear');
    }
}

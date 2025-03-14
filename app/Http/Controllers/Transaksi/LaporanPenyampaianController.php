<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\LaporanPenyampaian\DataRequest;
use App\Http\Requests\Transaksi\LaporanPenyampaian\SimpanRequest;
use App\Models\JenisLapor;
use App\Repositories\Transaksi\PenyampaianRepository;
use App\Support\Facades\Memo;
use Carbon\Carbon;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class LaporanPenyampaianController extends Controller implements HasMiddleware
{
    protected PenyampaianRepository $repository;

    public function __construct(
        PenyampaianRepository $repository,
    ) {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:laporan-penyampaian-index', only: ['index']),
            new Middleware('can:laporan-penyampaian-create', only: ['store']),
            new Middleware('can:laporan-penyampaian-update', only: ['update'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('laporan-penyampaian-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('laporan-penyampaian-create'),
                'update' => $user->can('laporan-penyampaian-update'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Transaksi/LaporanPenyampaian/Index', compact("gate"));
    }

    public function form(JenisLapor $jenisLapor)
    {
        if (now()->between(Carbon::parse($jenisLapor->tanggal_awal), Carbon::parse($jenisLapor->tanggal_akhir))) {
            return inertia('Transaksi/LaporanPenyampaian/Data', compact('jenisLapor'));
        } else {
            return back();
        }
    }

    /**
     * Resource from storage.
     */
    public function data(DataRequest $request)
    {
        return response()->json($this->repository->dataLaporan($request), 200);
    }

    /**
     * Resource from storage.
     */
    public function simpan(SimpanRequest $request)
    {
        return response()->json($this->repository->simpanLaporan($request), 200);
    }
}

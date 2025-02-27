<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PenyampaianController extends Controller implements HasMiddleware
{
    // protected PegawaiRepository $repository;

    // public function __construct(PegawaiRepository $repository)
    // {
    //     $this->repository = $repository;
    // }
    public static function middleware(): array
    {
        return [
            new Middleware('can:pegawai-index', only: ['index', 'data']),
            new Middleware('can:pegawai-create', only: ['store']),
            new Middleware('can:pegawai-update', only: ['update']),
            new Middleware('can:pegawai-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('pegawai-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('pegawai-create'),
                'update' => $user->can('pegawai-update'),
                'delete' => $user->can('pegawai-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $data = [];
        $satuanKerja = $user?->satuanKerja[0];
        foreach ($satuanKerja->kelurahan as $value) {
            $data[] = [
                'kd_propinsi' => $value->kd_propinsi,
                'kd_dati2' => $value->kd_dati2,
                'kd_kecamatan' => $value->kd_kecamatan,
                'kd_kelurahan' => $value->kd_kelurahan,
                'nama' => $value->nm_kelurahan,
            ];
        }
        dd($data);
        $gate = $this->gate();
        return inertia('Transaksi/Penyampaian/Index', compact("gate"));
    }
}

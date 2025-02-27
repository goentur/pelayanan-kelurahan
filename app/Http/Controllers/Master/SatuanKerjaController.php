<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Master\SatuanKerja\StoreSatuanKerja;
use App\Http\Requests\Master\SatuanKerja\UpdateSatuanKerja;
use App\Models\SatuanKerja;
use App\Repositories\Master\SatuanKerja\SatuanKerjaRepository;
use App\Support\Facades\Memo;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class SatuanKerjaController extends Controller implements HasMiddleware
{
    protected SatuanKerjaRepository $repository;

    public function __construct(SatuanKerjaRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:satuan-kerja-index', only: ['index', 'data']),
            new Middleware('can:satuan-kerja-create', only: ['store']),
            new Middleware('can:satuan-kerja-update', only: ['update']),
            new Middleware('can:satuan-kerja-delete', only: ['destroy'])
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('satuan-kerja-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('satuan-kerja-create'),
                'update' => $user->can('satuan-kerja-update'),
                'delete' => $user->can('satuan-kerja-delete'),
            ];
        });
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gate = $this->gate();
        return inertia('Master/SatuanKerja/Index', compact("gate"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSatuanKerja $request)
    {
        // $@ngatRahas1a
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(SatuanKerja $satuanKerja)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SatuanKerja $satuanKerja)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSatuanKerja $request, SatuanKerja $satuanKerja)
    {
        $this->repository->update($satuanKerja->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SatuanKerja $satuanKerja)
    {
        $this->repository->delete($satuanKerja->id);
        back()->with('success', 'Data berhasil dihapus');
    }

    /**
     * Resource from storage.
     */
    public function data(DataRequest $request)
    {
        return response()->json($this->repository->data($request), 200);
    }

    /**
     * All resource from storage.
     */
    public function allData(Request $request)
    {
        return response()->json($this->repository->allData($request), 200);
    }
}

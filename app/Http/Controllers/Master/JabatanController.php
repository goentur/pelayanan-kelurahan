<?php

namespace App\Http\Controllers\Master;

use App\Enums\JabatanJenis;
use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Master\Jabatan\StoreJabatan;
use App\Http\Requests\Master\Jabatan\UpdateJabatan;
use App\Models\Jabatan;
use App\Repositories\Master\Jabatan\JabatanRepository;
use App\Support\Facades\Memo;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class JabatanController extends Controller implements HasMiddleware
{
    protected JabatanRepository $repository;

    public function __construct(JabatanRepository $repository)
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
        return inertia('Master/Jabatan/Index', compact("gate"));
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
    public function store(StoreJabatan $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Jabatan $jabatan)
    {
        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jabatan $jabatan)
    {
        abort(404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJabatan $request, Jabatan $jabatan)
    {
        $this->repository->update($jabatan->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jabatan $jabatan)
    {
        $this->repository->delete($jabatan->id);
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

    /**
     * All resource from storage.
     */
    public function dataJenis()
    {
        return response()->json(JabatanJenis::toArray(), 200);
    }
}

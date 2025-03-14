<?php

namespace App\Http\Controllers\Sppt;

use App\Http\Controllers\Controller;
use App\Http\Requests\Transaksi\Penyampaian\DataRequest;
use App\Repositories\Common\JenisBukuRepository;
use App\Repositories\Sppt\SpptRepository;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class DataController extends Controller implements HasMiddleware
{
    protected SpptRepository $repository;
    protected JenisBukuRepository $jenisBukuRepository;

    public function __construct(
        SpptRepository $repository,
        JenisBukuRepository $jenisBukuRepository,
    ) {
        $this->repository = $repository;
        $this->jenisBukuRepository = $jenisBukuRepository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:sppt-data-index', only: ['index', 'data']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jenisBuku = $this->jenisBukuRepository->data();
        return inertia('Sppt/Data/Index', compact("jenisBuku"));
    }

    /**
     * Resource from storage.
     */
    public function data(DataRequest $request)
    {
        return response()->json($this->repository->data($request), 200);
    }
}

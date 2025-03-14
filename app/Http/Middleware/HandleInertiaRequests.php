<?php

namespace App\Http\Middleware;

use App\Support\Facades\Memo;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $authData = Memo::forHour('handle-inertia-request-' . $request->user()?->id, function () use ($request) {
            $user = $request->user();
            $satuanKerja = $user?->satuanKerja[0] ?? null;
            return [
                'user' => $user,
                'permissions' => $user?->roles[0]->permissions->pluck('name'),
                'satuan_kerja' => [
                    'id' => $satuanKerja?->id ?? time(),
                    'nama' => $satuanKerja?->nama ?? 'BPKAD KOTA PEKALONGAN',
                ]
            ];
        });
        return [
            ...parent::share($request),
            'auth' => $authData,
            'flash' => [
                'error' => fn() => $request->session()->get('error'),
                'success' => fn() => $request->session()->get('success'),
            ],
        ];
    }
}

<?php

namespace App\Repositories\Transaksi;

use App\Enums\PenyampaianStatus;
use App\Enums\PenyampaianTipe;
use App\Http\Resources\Common\LabelValueResource;
use App\Http\Resources\Transaksi\Penyampaian\DataResource;
use App\Models\BakuAwal;
use App\Models\Penyampaian;
use App\Models\Ref\RefPenyampaianKeterangan;
use App\Repositories\Common\JenisBukuRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PenyampaianRepository
{
    public function __construct(
        protected Penyampaian $model,
        protected JenisBukuRepository $jenisBuku,
    ) {}
    public function allData()
    {
        return LabelValueResource::collection($this->model::select('uuid', 'name')->get());
    }
    public function data($request)
    {
        $nop = explode('.', $request->kelurahan);
        $query = BakuAwal::select('kd_propinsi', 'kd_dati2', 'kd_kecamatan', 'kd_kelurahan', 'kd_blok', 'no_urut', 'kd_jns_op', 'thn_pajak_sppt', 'nm_wp_sppt', 'jln_wp_sppt', 'blok_kav_no_wp_sppt', 'pbb_yg_harus_dibayar_sppt')
            ->where([
                'kd_propinsi' => $nop[0],
                'kd_dati2' => $nop[1],
                'kd_kecamatan' => $nop[2],
                'kd_kelurahan' => $nop[3],
                'thn_pajak_sppt' => date('Y'),
            ]);
        if (!empty($request->jenisBuku)) {
            $nominal = $this->jenisBuku->dataNominal($request->jenisBuku);
            $query->whereBetween('pbb_yg_harus_dibayar_sppt', [$nominal['min'], $nominal['max']]);
        }
        if (!empty($request->kd_blok)) {
            $query->where('kd_blok', $request->kd_blok);
        }
        if (!empty($request->no_urut)) {
            $query->where('no_urut', $request->no_urut);
        }
        $query->orderBy('kd_propinsi')->orderBy('kd_dati2')->orderBy('kd_kecamatan')->orderBy('kd_kelurahan')->orderBy('kd_blok')->orderBy('no_urut')->orderBy('kd_jns_op');
        $result = DataResource::collection($query->paginate($request->perPage ?? 25))->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }
    public function simpan($request)
    {
        $tahun = date('Y');
        $nop = explode('.', $request->id);
        $penyampaian = $this->model::select('id')->where([
            'kd_propinsi' => $nop[0],
            'kd_dati2' => $nop[1],
            'kd_kecamatan' => $nop[2],
            'kd_kelurahan' => $nop[3],
            'kd_blok' => $nop[4],
            'no_urut' => $nop[5],
            'kd_jns_op' => $nop[6],
            'tahun' => $tahun,
        ])->first();
        try {
            DB::beginTransaction();

            $tipe = $request->type === 'ya' ? PenyampaianTipe::TERSAMPAIKAN : PenyampaianTipe::TIDAK;
            $keterangan = $request->type === 'tidak' ? RefPenyampaianKeterangan::find($request->value)?->nama : null;

            if (!$penyampaian) {
                $this->model::create([
                    'user_id' => auth()->id(),
                    'penyampaian_keterangan_id' => $request->type === 'tidak' ? $request->value : null,
                    'kd_propinsi' => $nop[0],
                    'kd_dati2' => $nop[1],
                    'kd_kecamatan' => $nop[2],
                    'kd_kelurahan' => $nop[3],
                    'kd_blok' => $nop[4],
                    'no_urut' => $nop[5],
                    'kd_jns_op' => $nop[6],
                    'tahun' => $tahun,
                    'tanggal' => now(),
                    'tipe' => $tipe,
                    'status' => PenyampaianStatus::SIMPAN,
                    'keterangan' => $keterangan ?? $request->value,
                ]);
            } else {
                $penyampaian->update([
                    'user_id' => auth()->id(),
                    'penyampaian_keterangan_id' => $request->type === 'tidak' ? $request->value : null,
                    'keterangan' => $keterangan ?? $request->value,
                ]);
            }

            DB::commit();

            return [
                'status' => true,
                'tipe' => [
                    'status' => $request->type === 'ya',
                    'value' => $tipe
                ],
                'message' => "OK",
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return [
                'status' => false,
                'tipe' => [
                    'status' => null,
                    'value' => null
                ],
                'message' => "GAGAL",
            ];
        }
    }
}

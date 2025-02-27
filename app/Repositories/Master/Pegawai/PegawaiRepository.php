<?php

namespace App\Repositories\Master\Pegawai;

use App\Http\Resources\Common\LabelValueResource;
use App\Http\Resources\Pegawai\PegawaiResource;
use App\Models\Pegawai;
use Illuminate\Support\Facades\DB;

class PegawaiRepository
{
     public function __construct(protected Pegawai $model) {}
     public function allData()
     {
          return LabelValueResource::collection($this->model::select('id', 'nama')->get());
     }
     public function data($request)
     {
          $query = $this->model::select('id', 'jabatan_id', 'nik', 'nip', 'nama', 'no_rekening')->where('satuan_kerja_id', $request->satuan_kerja);
          if ($request->search) {
               $query->where('nik', 'like', "%{$request->search}%")
                    ->orWhere('nip', 'like', "%{$request->search}%")
                    ->orWhere('nama', 'like', "%{$request->search}%")
                    ->orWhere('no_rekening', 'like', "%{$request->search}%")
                    ->orWhereHas('jabatan', fn($q) => $q->where('nama', 'like', "%{$request->search}%"));
          }
          $result = PegawaiResource::collection($query->latest()->paginate($request->perPage ?? 25))->response()->getData(true);
          return $result['meta'] + ['data' => $result['data']];
     }
     public function store($request)
     {
          try {
               DB::beginTransaction();
               $this->model::create([
                    'satuan_kerja_id' => $request->satuan_kerja,
                    'jabatan_id' => $request->jabatan,
                    'nik' => $request->nik,
                    'nip' => $request->nip,
                    'nama' => $request->nama,
                    'no_rekening' => $request->no_rekening,
               ]);
               DB::commit();
          } catch (\Exception $e) {
               DB::rollBack();
               throw $e;
          }
     }
     public function update($id, $request)
     {
          try {
               DB::beginTransaction();
               $data = $this->model::find($id);
               $data->update([
                    'nama' => $request->nama,
                    'jenis' => $request->jenis,
               ]);
               DB::commit();
          } catch (\Exception $e) {
               DB::rollBack();
               throw $e;
          }
     }
     public function delete($id)
     {
          return $this->model->findOrFail($id)?->delete();
     }
}

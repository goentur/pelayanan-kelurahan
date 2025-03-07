<?php

namespace App\Http\Resources\Transaksi\Penyampaian;

use App\Enums\PenyampaianStatus;
use App\Enums\PenyampaianTipe;
use App\Support\Facades\Helpers;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DataResource extends JsonResource
{
     /**
      * Transform the resource into an array.
      *
      * @return array<string, mixed>
      */
     public function toArray(Request $request): array
     {
          return [
               'id' => $this->kd_propinsi . '.' . $this->kd_dati2 . '.' . $this->kd_kecamatan . '.' . $this->kd_kelurahan . '.' . $this->kd_blok . '.' . $this->no_urut . '.' . $this->kd_jns_op,
               'blok' => $this->kd_blok,
               'jenis' => $this->kd_jns_op,
               'no' => $this->no_urut,
               'nama' => $this->nm_wp_sppt,
               'alamat' => $this->jln_wp_sppt . ' ' . $this->blok_kav_no_wp_sppt,
               'pajak' => Helpers::ribuan($this->pbb_yg_harus_dibayar_sppt),
               'penyampaian' => $this->when(!blank($this->penyampaian), function () {
                    return [
                         'tipe' => [
                              'status' => $this->penyampaian->tipe == PenyampaianTipe::TERSAMPAIKAN->value ? true : false,
                              'label' => $this->penyampaian->tipe,
                              'value' => $this->penyampaian->status == PenyampaianStatus::SIMPAN->value ? ($this->penyampaian->tipe == PenyampaianTipe::TERSAMPAIKAN->value ? $this->penyampaian->keterangan : $this->penyampaian->penyampaian_keterangan_id) : ($this->penyampaian->tipe == PenyampaianTipe::TERSAMPAIKAN->value ? Carbon::parse($this->penyampaian->keterangan)->format('d-m-Y') : $this->penyampaian->keterangan),
                         ],
                         'status' => [
                              'status' => $this->penyampaian->status == PenyampaianStatus::SIMPAN->value ? true : false,
                              'value' => $this->penyampaian->status == PenyampaianStatus::SIMPAN->value ? 'OK' : PenyampaianStatus::TERLAPOR,
                         ],
                    ];
               }),
          ];
     }
}

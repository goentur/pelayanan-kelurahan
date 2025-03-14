<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Penyampaian extends Model
{
    use HasUuids;
    protected $fillable = ['user_id', 'penyampaian_keterangan_id', 'jenis_lapor_id', 'kd_propinsi', 'kd_dati2', 'kd_kecamatan', 'kd_kelurahan', 'kd_blok', 'no_urut', 'kd_jns_op', 'tahun', 'nominal', 'tipe', 'status', 'keterangan'];

    public function bakuAwal()
    {
        return $this->hasOne(BakuAwal::class, 'kd_propinsi', 'kd_propinsi')
            ->where('kd_dati2', $this->kd_dati2)
            ->where('kd_kecamatan', $this->kd_kecamatan)
            ->where('kd_kelurahan', $this->kd_kelurahan)
            ->where('kd_blok', $this->kd_blok)
            ->where('no_urut', $this->no_urut)
            ->where('kd_jns_op', $this->kd_jns_op)
            ->where('thn_pajak_sppt', $this->tahun);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sppt extends Model
{
    protected $table = 'sppt';
    public $incrementing = false;
    protected $primaryKey = [
        'kd_propinsi',
        'kd_dati2',
        'kd_kecamatan',
        'kd_kelurahan',
        'kd_blok',
        'no_urut',
        'kd_jns_op',
        'thn_pajak_sppt'
    ];
    protected $keyType = 'string';
    public $timestamps = false;
}

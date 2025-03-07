<?php

namespace App\Models\Ref;

use Illuminate\Database\Eloquent\Model;

class RefKelurahan extends Model
{
    protected $table = 'ref_kelurahan'; // Gunakan schema user lain
    protected $primaryKey = 'kd_kel_br'; // Sesuaikan dengan primary key
    public $timestamps = false; // Jika tabel tidak memiliki timestamps (created_at, updated_at)
}

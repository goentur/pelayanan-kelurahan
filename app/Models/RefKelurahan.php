<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefKelurahan extends Model
{
    protected $table = 'REF_KELURAHAN'; // Gunakan schema user lain
    protected $primaryKey = 'KD_KEL_BR'; // Sesuaikan dengan primary key
    public $timestamps = false; // Jika tabel tidak memiliki timestamps (created_at, updated_at)
}

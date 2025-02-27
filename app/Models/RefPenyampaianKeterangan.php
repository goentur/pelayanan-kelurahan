<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class RefPenyampaianKeterangan extends Model
{
    use HasUuids;
    protected $fillable = ['nama', 'keterangan'];
}

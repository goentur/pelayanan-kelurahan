<?php

use App\Http\Controllers\Master\JabatanController;
use App\Http\Controllers\Master\PegawaiController;
use App\Http\Controllers\Master\PenyampaianKeteranganController;
use App\Http\Controllers\Master\SatuanKerjaController;
use App\Http\Controllers\Pengaturan\AplikasiController;
use App\Http\Controllers\Pengaturan\PenggunaController;
use App\Http\Controllers\Pengaturan\PermissionController;
use App\Http\Controllers\Pengaturan\RoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Transaksi\PenyampaianController;
use App\Models\Jabatan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('login');
})->name('/');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::prefix('master')->name('master.')->group(function () {
        Route::prefix('satuan-kerja')->name('satuan-kerja.')->group(function () {
            Route::middleware('can:satuan-kerja-index')->post('data', [SatuanKerjaController::class, 'data'])->name('data');
            Route::post('all-data', [SatuanKerjaController::class, 'allData'])->name('all-data');
            Route::post('data-berdasarkan-user', [SatuanKerjaController::class, 'dataBerdasarkanUser'])->name('data-berdasarkan-user');
        });
        Route::prefix('jabatan')->name('jabatan.')->group(function () {
            Route::middleware('can:jabatan-index')->post('data', [JabatanController::class, 'data'])->name('data');
            Route::middleware('can:jabatan-create')->post('data-jenis', [JabatanController::class, 'dataJenis'])->name('data-jenis');
            Route::post('all-data', [JabatanController::class, 'allData'])->name('all-data');
        });
        Route::prefix('pegawai')->name('pegawai.')->group(function () {
            Route::middleware('can:pegawai-index')->post('data', [PegawaiController::class, 'data'])->name('data');
        });
        Route::prefix('penyampaian-keterangan')->name('penyampaian-keterangan.')->group(function () {
            Route::middleware('can:penyampaian-keterangan-index')->post('data', [PenyampaianKeteranganController::class, 'data'])->name('data');
            Route::post('all-data', [PenyampaianKeteranganController::class, 'allData'])->name('all-data');
        });
        Route::resource('satuan-kerja', SatuanKerjaController::class)->middleware('can:satuan-kerja-index');
        Route::resource('jabatan', JabatanController::class)->middleware('can:jabatan-index');
        Route::resource('penyampaian-keterangan', PenyampaianKeteranganController::class)->middleware('can:penyampaian-keterangan-index');
        Route::resource('pegawai', PegawaiController::class)->middleware('can:pegawai-index');
    });
    Route::prefix('pengaturan')->name('pengaturan.')->group(function () {
        Route::prefix('pengguna')->name('pengguna.')->group(function () {
            Route::middleware('can:pengguna-index')->post('data', [PenggunaController::class, 'data'])->name('data');
        });
        Route::prefix('role')->name('role.')->group(function () {
            Route::middleware('can:role-index')->post('data', [RoleController::class, 'data'])->name('data');
            Route::post('all-data', [RoleController::class, 'allData'])->name('all-data');
        });
        Route::prefix('permission')->name('permission.')->group(function () {
            Route::middleware('can:permission-index')->post('data', [PermissionController::class, 'data'])->name('data');
            Route::post('all-data', [PermissionController::class, 'allData'])->name('all-data');
        });
        Route::prefix('aplikasi')->name('aplikasi.')->group(function () {
            Route::middleware('can:aplikasi-index')->group(function () {
                Route::get('/', [AplikasiController::class, 'index'])->name('index');
                Route::post('optimize-clear', [AplikasiController::class, 'optimizeClear'])->name('optimize-clear');
                Route::post('baku-awal', [AplikasiController::class, 'bakuAwal'])->name('baku-awal');
            });
            Route::middleware('can:aplikasi-update')->post('data', [AplikasiController::class, 'data'])->name('data');
        });
        Route::resource('pengguna', PenggunaController::class)->middleware('can:pengguna-index');
        Route::resource('role', RoleController::class)->middleware('can:role-index');
        Route::resource('permission', PermissionController::class)->middleware('can:permission-index');
    });
    Route::prefix('transaksi')->name('transaksi.')->group(function () {
        Route::prefix('penyampaian')->name('penyampaian.')->group(function () {
            Route::middleware('can:penyampaian-index')->group(function () {
                Route::get('/', [PenyampaianController::class, 'index'])->name('index');
                Route::post('data', [PenyampaianController::class, 'data'])->name('data');
                Route::post('simpan', [PenyampaianController::class, 'simpan'])->name('simpan');
            });
        });
    });
});

require __DIR__ . '/auth.php';

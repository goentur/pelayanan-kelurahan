<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Permission::create(['name' => 'pengguna-index']);
        Permission::create(['name' => 'pengguna-create']);
        Permission::create(['name' => 'pengguna-update']);
        Permission::create(['name' => 'pengguna-delete']);
        Permission::create(['name' => 'role-index']);
        Permission::create(['name' => 'role-create']);
        Permission::create(['name' => 'role-update']);
        Permission::create(['name' => 'role-delete']);
        Permission::create(['name' => 'permission-index']);
        Permission::create(['name' => 'permission-create']);
        Permission::create(['name' => 'permission-update']);
        Permission::create(['name' => 'permission-delete']);
        Permission::create(['name' => 'satuan-kerja-create']);
        Permission::create(['name' => 'satuan-kerja-delete']);
        Permission::create(['name' => 'satuan-kerja-update']);
        Permission::create(['name' => 'pegawai-index']);
        Permission::create(['name' => 'pegawai-create']);
        Permission::create(['name' => 'pegawai-delete']);
        Permission::create(['name' => 'aplikasi-update']);
        Permission::create(['name' => 'pegawai-update']);
        Permission::create(['name' => 'jabatan-index']);
        Permission::create(['name' => 'jabatan-create']);
        Permission::create(['name' => 'jabatan-update']);
        Permission::create(['name' => 'jabatan-delete']);
        Permission::create(['name' => 'aplikasi-index']);
        Permission::create(['name' => 'satuan-kerja-index']);
        $developer = Role::create(['name' => 'DEVELOPER']);
        $developer->givePermissionTo([
            'pengguna-index',
            'pengguna-create',
            'pengguna-update',
            'pengguna-delete',
            'satuan-kerja-index',
            'satuan-kerja-create',
            'satuan-kerja-update',
            'satuan-kerja-delete',
            'jabatan-index',
            'jabatan-create',
            'jabatan-update',
            'jabatan-delete',
            'role-index',
            'role-create',
            'role-update',
            'role-delete',
            'permission-index',
            'permission-create',
            'permission-update',
            'permission-delete',
            'aplikasi-index',
            'aplikasi-update',
        ]);
        $satuanKerja = Role::create(['name' => 'SATUAN-KERJA']);
        $satuanKerja->givePermissionTo([
            'pegawai-index',
            'pegawai-create',
            'pegawai-update',
            'pegawai-delete',
        ]);
        $userDeveloper = User::factory()->create([
            'email' => 'dev@pekalongankota.go.id',
            'name' => 'Developer',
            'password' => bcrypt('a')
        ]);
        $userDeveloper->assignRole($developer);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::where('name', 'admin')->first();

        User::create([
            'name' => 'aldyadmin',
            'email' => 'aldy@gmail.com',
            'password' => Hash::make('admin'),
            'role_id' => $admin->id
        ]);
    }
}

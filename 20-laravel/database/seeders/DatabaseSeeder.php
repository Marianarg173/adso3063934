<?php

namespace Database\Seeders;

use App\Models\pet;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            petSeeder::class,
            AdoptionSeeder::class,
        ]);
        User::factory(100)->create();
        pet::factory(40)->create();

    //     User::factory()->create([
    //         'name' => 'Test User',
    //         'email' => 'test@example.com',
    //   ]);
       }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuItemSeeder extends Seeder
{
    public function run()
    {
        DB::table('menu_items')->insert([
            // Example data; adjust as needed
            ['menu_id' => 1, 'name' => 'Home', 'depth' => 0, 'parent_id' => null],
            ['menu_id' => 1, 'name' => 'About', 'depth' => 0, 'parent_id' => null],
            ['menu_id' => 1, 'name' => 'Services', 'depth' => 0, 'parent_id' => null],
            ['menu_id' => 1, 'name' => 'Contact', 'depth' => 0, 'parent_id' => null],
            ['menu_id' => 2, 'name' => 'Dashboard', 'depth' => 0, 'parent_id' => null],
            ['menu_id' => 2, 'name' => 'Profile', 'depth' => 0, 'parent_id' => null],
            ['menu_id' => 2, 'name' => 'Settings', 'depth' => 0, 'parent_id' => null],
        ]);
    }
}

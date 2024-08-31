<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Menu;

class MenuSeeder extends Seeder
{
    public function run()
    {
        // Root menus
        $root1 = Menu::create(['name' => 'Root 1', 'depth' => 0]);
        $root2 = Menu::create(['name' => 'Root 2', 'depth' => 0]);

        // Level 1 submenus
        $sub1 = Menu::create(['name' => 'Submenu 1.1', 'parent_id' => $root1->id, 'depth' => 1]);
        $sub2 = Menu::create(['name' => 'Submenu 1.2', 'parent_id' => $root1->id, 'depth' => 1]);
        $sub3 = Menu::create(['name' => 'Submenu 2.1', 'parent_id' => $root2->id, 'depth' => 1]);

        // Level 2 submenus
        $sub11 = Menu::create(['name' => 'Submenu 1.1.1', 'parent_id' => $sub1->id, 'depth' => 2]);
        $sub12 = Menu::create(['name' => 'Submenu 1.1.2', 'parent_id' => $sub1->id, 'depth' => 2]);

        // Level 3 submenus
        $sub111 = Menu::create(['name' => 'Submenu 1.1.1.1', 'parent_id' => $sub11->id, 'depth' => 3]);

        // Level 4 submenus
        $sub1111 = Menu::create(['name' => 'Submenu 1.1.1.1.1', 'parent_id' => $sub111->id, 'depth' => 4]);
    }
}

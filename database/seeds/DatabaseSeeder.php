<?php

# Remember to use $ composer dump-autoload

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	
        $this->call(GroupTypesSeeder::class);
    }
}

<?php

# Remember to use the following command when you update this file:
#
# > composer dump-autoload

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
		$this->call(UnitsSeeder::class);
		$this->call(TutorSeeder::class);
		$this->call(ProductsSeeder::class);
		$this->call(GroupTypesSeeder::class);
		$this->call(GroupsSeeder::class);
		$this->call(PermissionsSeeder::class);
		$this->call(ProductTypesSeeder::class);
		$this->call(UserSeeder::class);
		$this->call(BookingsSeeder::class);
	}
}

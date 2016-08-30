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
		$this->call(UserSeeder::class);
		$this->call(UnitsSeeder::class);
		$this->call(TutorSeeder::class);
		$this->call(GroupsSeeder::class);
		$this->call(ProductsSeeder::class);
		$this->call(BookingsSeeder::class);
		$this->call(GroupTypesSeeder::class);
		$this->call(PermissionsSeeder::class);
		$this->call(BookingUnitSeeder::class);
		$this->call(ProductTypesSeeder::class);
	}
}

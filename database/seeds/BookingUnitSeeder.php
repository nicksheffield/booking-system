<?php

use Illuminate\Database\Seeder;

class BookingUnitSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('booking_unit')->delete();
		
		$items = [
			[
				'id' => 1,
				'booking_id' => 1,
				'unit_id' => 2,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => null
			],
			[
				'id' => 2,
				'booking_id' => 2,
				'unit_id' => 2,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => null
			],
			[
				'id' => 3,
				'booking_id' => 2,
				'unit_id' => 5,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => null
			],
			[
				'id' => 4,
				'booking_id' => 2,
				'unit_id' => 6,
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => null
			],
		];
		
		DB::table('booking_unit')->insert($items);
	}
}

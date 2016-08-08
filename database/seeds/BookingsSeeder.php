<?php

use Illuminate\Database\Seeder;

class BookingsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('bookings')->delete();

		$items = [
			[
				'id' => 1,
				'user_id' => 2
			],
			[
				'id' => 2,
				'user_id' => 2
			],
		];

		foreach($items as $item) {
			App\Models\Booking::create($item);
		}
	}
}

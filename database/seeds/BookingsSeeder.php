<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

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
				'user_id' => 2,
				'pickup_at' => Carbon::now()->subDays(1),
				'due_at' => Carbon::now()->subDays(1)->addHours(1)
			],
			[
				'id' => 2,
				'user_id' => 2,
				'pickup_at' => Carbon::now()->addHours(1),
				'due_at' => Carbon::now()->addDays(1)
			],
		];

		foreach($items as $item) {
			App\Models\Booking::create($item);
		}
	}
}

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
				'taken_at' => Carbon::now()->subDays(1),
				'due_at' => Carbon::now()->subDays(1)->addHours(1),
				'closed_at' => Carbon::now()->subDays(1)->addHours(1),
				'created_by' => 2,
				'issued_by' => 1,
				'closed_by' => 1
			]
		];
		
		$users = DB::table('users')->get();
		$booking_per_person = 20;
		
		foreach($users as $user) {
			for($i=0; $i<$booking_per_person; $i++) {
				$items[] = [
					'id' => $items[count($items)-1]['id'] + 1,
					'user_id' => $user->id,
					'pickup_at' => Carbon::now()->subDays(1),
					'taken_at' => Carbon::now()->subDays(1),
					'due_at' => Carbon::now()->subDays(1)->addHours(1),
					'closed_at' => Carbon::now()->subDays(1)->addHours(1),
					'created_by' => $user->id,
					'issued_by' => 1,
					'closed_by' => 1
				];
			}
		}

		foreach($items as $item) {
			App\Models\Booking::create($item);
		}
	}
}

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

		$date = '2016-11-17';

		$items = [
			[
				'id' => 1,
				'user_id' => 2,
				'pickup_at' => Carbon::parse($date)->subDays(1),
				'taken_at' => Carbon::parse($date)->subDays(1),
				'due_at' => Carbon::parse($date),
				'closed_at' => Carbon::parse($date),
				'created_by_id' => 2,
				'issued_by_id' => 1,
				'closed_by_id' => 1
			]
		];
		
		$users = DB::table('users')->get();
		$booking_per_person = 1;
		
		foreach($users as $user) {
			for($i=0; $i<$booking_per_person; $i++) {
				$date = '2016-'.rand(1,(int)date('m')-1).'-'.rand(0, 28);

				$items[] = [
					'id' => $items[count($items)-1]['id'] + 1,
					'user_id' => $user->id,
					'pickup_at' => Carbon::parse($date)->subDays(1),
					'taken_at' => Carbon::parse($date)->subDays(1),
					'due_at' => Carbon::parse($date),
					'closed_at' => Carbon::parse($date),
					'created_by_id' => $user->id,
					'issued_by_id' => 1,
					'closed_by_id' => 1,
					'created_at' => Carbon::parse($date)->subDays(2)
				];
			}
		}

		foreach($items as $item) {
			App\Models\Booking::create($item);
		}
	}
}

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
		DB::table('booking_product')->delete();

		$date = '2016-11-17';

		$bookings = [
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

		$products = [
			[
				'id' => 1,
				'booking_id' => 1,
				'product_id' => 2,
				'unit_id' => 2,
				'notes' => '',
				'returned_by_id' => 1,
				'returned_at' => date('Y-m-d H:i:s'),
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => null
			]
		];
		
		$users = DB::table('users')->get();
		$units = DB::table('units')->get();
		
		foreach($users as $user) {
			$booking_per_person = rand(1, 4);

			for($i=0; $i<$booking_per_person; $i++) {
				$date = '2016-'.rand(1, 12).'-'.rand(0, 28);

				$status = rand(1, 3);
				# 1: booked
				# 2: issued
				# 3: closed

				$booking = [
					'id' => $bookings[count($bookings)-1]['id'] + 1,
					'user_id' => $user->id,
					'pickup_at' => Carbon::parse($date)->subDays(1),
					'taken_at' => $status > 1 ? Carbon::parse($date)->subDays(1) : null,
					'due_at' => Carbon::parse($date),
					'closed_at' => $status == 3 ? Carbon::parse($date) : null,
					'created_by_id' => $user->id,
					'issued_by_id' => 1,
					'closed_by_id' => $status == 3 ? 1 : null,
					'created_at' => Carbon::parse($date)->subDays(2),
					'updated_at' => Carbon::parse($date)->subDays(2),
					'updated_at' => null
				];

				$bookings[] = $booking;

				$num_units = mt_rand(1, 4);
				
				for($i=0; $i<$num_units; $i++) {
					$unit = $units[mt_rand(0, count($units) - 1)];
					
					$products[] = [
						'id' => $products[count($products)-1]['id'] + 1,
						'booking_id' => $booking['id'],
						'unit_id' => $unit->id,
						'product_id' => $unit->product_id,
						'notes' => '',
						'returned_by_id' => $status == 3 ? 1 : null,
						'returned_at' => $status == 3 ? $booking['closed_at'] : null,
						'created_at' => $booking['created_at'],
						'updated_at' => null
					];
				}
			}
		}

		foreach($bookings as $booking) {
			DB::table('bookings')->insert($booking);
		}

		foreach($products as $product) {
			DB::table('booking_product')->insert($product);
		}
	}
}

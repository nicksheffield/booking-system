<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class BookingsTestSeeder extends Seeder
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

		$date = date('Y-m-d');

		function make($opts) {
			$defaults = [
				'user_id' => 1,
				'pickup_at' => Carbon::parse(date('Y-m-d')),
				'due_at' => Carbon::parse(date('Y-m-d'))->addDays(3),
				'created_by_id' => 1,
				'created_at' => Carbon::parse(date('Y-m-d'))
			];

			return array_merge($defaults, $opts);
		}

		// [
		// 	'id' => 1,
		// 	'user_id' => 2,
		// 	'pickup_at' => Carbon::parse($date)->subDays(1),
		// 	'taken_at' => Carbon::parse($date)->subDays(1),
		// 	'due_at' => Carbon::parse($date),
		// 	'closed_at' => Carbon::parse($date),
		// 	'created_by_id' => 2,
		// 	'issued_by_id' => 1,
		// 	'closed_by_id' => 1,
		// 	'created_at' => Carbon::parse($date)
		// ],

		$bookings = [
			
			// booking with pickup in 2 or more days
			make([
				'pickup_at' => Carbon::parse($date)->addDays(2)
			]),
			
			// booking with pickup in 1 day
			make([
				'pickup_at' => Carbon::parse($date)->addDays(1)
			]),
			
			// booking with pickup in 0 days
			make([
				'pickup_at' => Carbon::parse($date)
			]),
			
			// booking with pickup 1 day ago
			make([
				'pickup_at' => Carbon::parse($date)->subDays(1)
			]),
			
			// booking with pickup 2 or more days ago
			make([
				'pickup_at' => Carbon::parse($date)->subDays(2)
			]),
			
			// issued with due in 2 or more days
			make([
				'due_at' => Carbon::parse($date)->addDays(2),
				'taken_at' => Carbon::parse($date)
			]),
			
			// issued with due in 1 day
			make([
				'due_at' => Carbon::parse($date)->addDays(1),
				'taken_at' => Carbon::parse($date)
			]),
			
			// issued with due in 0 days
			make([
				'due_at' => Carbon::parse($date),
				'taken_at' => Carbon::parse($date)
			]),
			
			// issued with due 1 day ago
			make([
				'due_at' => Carbon::parse($date)->subDays(1),
				'taken_at' => Carbon::parse($date)
			]),
			
			// issued with due 2 or more days ago
			make([
				'due_at' => Carbon::parse($date)->subDays(2),
				'taken_at' => Carbon::parse($date)
			]),
			
			// closed today
			make([
				'closed_at' => Carbon::parse($date),
				'taken_at' => Carbon::parse($date)
			]),
			
			// closed 1 day ago
			make([
				'closed_at' => Carbon::parse($date)->subDays(1),
				'taken_at' => Carbon::parse($date)
			]),
			
			// closed 2 or more days ago
			make([
				'closed_at' => Carbon::parse($date)->subDays(2),
				'taken_at' => Carbon::parse($date)
			])
		];

		foreach($bookings as $id => $booking) {
			$booking['id'] = $id + 1;
			DB::table('bookings')->insert($booking);
		}
	}
}

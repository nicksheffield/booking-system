<?php

use Illuminate\Database\Seeder;

class BookingProductSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('booking_product')->delete();
		
		$items = [
			[
				'id' => 1,
				'booking_id' => 1,
				'product_id' => 2,
				'unit_id' => 2,
				'notes' => '',
				'returned_at' => date('Y-m-d H:i:s'),
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => null
			]
		];
		
		$bookings = DB::table('bookings')->get();
		$units = DB::table('units')->get();
		
		foreach($bookings as $booking) {
			$num_units = mt_rand(1, 4);
			
			for($i=0; $i<$num_units; $i++) {
				$unit = $units[mt_rand(0, count($units) - 1)];
				
				$items[] = [
					'id' => $items[count($items)-1]['id'] + 1,
					'booking_id' => $booking->id,
					'unit_id' => $unit->id,
					'product_id' => $unit->product_id,
					'notes' => '',
					'returned_at' => date('Y-m-d H:i:s'),
					'created_at' => date('Y-m-d H:i:s'),
					'updated_at' => null
				];
			}
		}
		
		DB::table('booking_product')->insert($items);
	}
}

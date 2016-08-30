<?php

use Illuminate\Database\Seeder;

class UnitsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('units')->delete();

		$items = [
			1, 1, 1, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11,
			12, 13, 14, 15, 16, 16, 17, 18, 19, 20, 21, 22, 23,
			24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 
		];

		$c = 1;

		foreach($items as $product_id) {
			$item = [
				'id' => $c++,
				'unit_number' => randInt(5),
				'serial_number' => randInt(5),
				'asset_number' => randInt(5),
				'notes' => '',
				'product_id' => $product_id
			];

			App\Models\Unit::create($item);
		}
	}
}

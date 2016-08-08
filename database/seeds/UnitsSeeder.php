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
			[
				'id' => 1,
				'unit_number' => 'N10001',
				'notes' => 'Loses battery fast',
				'product_id' => 1
			],
			[
				'id' => 2,
				'unit_number' => 'N10002',
				'notes' => '',
				'product_id' => 1
			],
			[
				'id' => 3,
				'unit_number' => 'N10004',
				'notes' => '',
				'product_id' => 1
			],
			[
				'id' => 4,
				'unit_number' => 'N10010',
				'notes' => '',
				'product_id' => 2
			],
		];

		foreach($items as $item) {
			App\Models\Unit::create($item);
		}
	}
}

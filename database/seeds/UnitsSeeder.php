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
				'notes' => 'Drains battery fast',
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
			[
				'id' => 5,
				'unit_number' => 'N10020',
				'notes' => '',
				'product_id' => 3
			],
			[
				'id' => 6,
				'unit_number' => 'N10021',
				'notes' => '',
				'product_id' => 3
			],
			[
				'id' => 7,
				'unit_number' => 'N10022',
				'notes' => '',
				'product_id' => 3
			],
		];

		foreach($items as $item) {
			App\Models\Unit::create($item);
		}
	}
}

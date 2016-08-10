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
				'unit_number' => 'N'.randInt(5),
				'serial_number' => '',
				'asset_number' => '',
				'notes' => 'Drains battery fast',
				'product_id' => 1
			],
			[
				'id' => 2,
				'unit_number' => 'N'.randInt(5),
				'serial_number' => '',
				'asset_number' => '',
				'notes' => '',
				'product_id' => 1
			],
			[
				'id' => 3,
				'unit_number' => 'N'.randInt(5),
				'serial_number' => '',
				'asset_number' => '',
				'notes' => '',
				'product_id' => 1
			],
			[
				'id' => 4,
				'unit_number' => 'N'.randInt(5),
				'serial_number' => '',
				'asset_number' => '',
				'notes' => '',
				'product_id' => 2
			],
			[
				'id' => 5,
				'unit_number' => 'N'.randInt(5),
				'serial_number' => '',
				'asset_number' => '',
				'notes' => '',
				'product_id' => 3
			],
			[
				'id' => 6,
				'unit_number' => 'N'.randInt(5),
				'serial_number' => '',
				'asset_number' => '',
				'notes' => '',
				'product_id' => 3
			],
			[
				'id' => 7,
				'unit_number' => 'N'.randInt(5),
				'serial_number' => '',
				'asset_number' => '',
				'notes' => '',
				'product_id' => 3
			],
		];

		foreach($items as $item) {
			App\Models\Unit::create($item);
		}
	}
}

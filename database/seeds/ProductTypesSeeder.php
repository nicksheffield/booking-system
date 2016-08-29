<?php

use Illuminate\Database\Seeder;

class ProductTypesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('product_types')->delete();

		$items = [
			[
				'id' => 1,
				'name' => 'Camera',
			],
			[
				'id' => 2,
				'name' => 'Lens',
			],
			[
				'id' => 3,
				'name' => 'Tripod',
			],
			[
				'id' => 4,
				'name' => 'Sound',
			],
			[
				'id' => 5,
				'name' => 'Lighting',
			],
			[
				'id' => 6,
				'name' => 'Other',
			],
		];

		foreach($items as $item) {
			App\Models\Product_Type::create($item);
		}
	}
}

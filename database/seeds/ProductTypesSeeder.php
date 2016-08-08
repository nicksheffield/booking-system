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
				'name' => 'Photography Camera',
			],
			[
				'id' => 2,
				'name' => 'Video Camera',
			],
			[
				'id' => 3,
				'name' => 'Tripod',
			],
			[
				'id' => 4,
				'name' => 'Battery',
			],
		];

		foreach($items as $item) {
			App\Models\Product_Type::create($item);
		}
	}
}

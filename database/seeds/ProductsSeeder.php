<?php

use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('products')->delete();

		$items = [
			[
				'id' => 1,
				'name' => '700d',
				'product_type_id' => 1
			],
			[
				'id' => 2,
				'name' => 'MovieCamera2000',
				'product_type_id' => 2
			],
			[
				'id' => 3,
				'name' => 'Camera Battery',
				'product_type_id' => 4
			],
		];

		foreach($items as $item) {
			App\Models\Product::create($item);
		}
	}
}

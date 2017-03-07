<?php

use Illuminate\Database\Seeder;

use App\Models\Group;
use App\Models\Product;

use Carbon\Carbon;

class PermissionsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('permissions')->delete();

		$items = [
			[
				'id' => 1,
				'group_id' => 1,
				'product_id' => 1,
				'quantity' => 1,
				'days_allowed' => 1
			],
			[
				'id' => 2,
				'group_id' => 1,
				'product_id' => 2,
				'quantity' => 1,
				'days_allowed' => 1
			],
			[
				'id' => 3,
				'group_id' => 2,
				'product_id' => 1,
				'quantity' => 1,
				'days_allowed' => 1
			],
			[
				'id' => 4,
				'group_id' => 1,
				'product_id' => 3,
				'quantity' => 1,
				'days_allowed' => 1
			],
		];

		foreach($items as $item) {
			$item['created_at'] = Carbon::now();
			$item['updated_at'] = Carbon::now();

			DB::table('permissions')->insert($item);
		}

		$groups = Group::where('id', '!=', 1)->where('id', '!=', 2)->get();
		$products = Product::all();

		$max_products_per_group = 10;

		foreach($groups as $group) {
			$count = rand(2, 10);

			$allowed_products = [];

			for($i=0; $i<$count; $i++) {
				do {
					$prod = $products[rand(0, count($products)-1)];
				} while(array_search($prod->id, $allowed_products) !== false);

				$allowed_products[] = $prod->id;
			}

			foreach($allowed_products as $allowed_product) {
				DB::table('permissions')->insert([
					'group_id' => $group->id,
					'product_id' => $allowed_product,
					'quantity' => 1,
					'days_allowed' => 1,
					'created_at' => Carbon::now(),
					'updated_at' => Carbon::now()
				]);
			}
		}
	}
}

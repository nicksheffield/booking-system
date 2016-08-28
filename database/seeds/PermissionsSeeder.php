<?php

use Illuminate\Database\Seeder;

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
			$item['created_at'] = date('Y-m-d H:i:s');
			$item['updated_at'] = null;

			DB::table('permissions')->insert($item);
		}
	}
}

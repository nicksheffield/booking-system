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
				'product_id' => 1
			],
			[
				'id' => 2,
				'group_id' => 1,
				'product_id' => 2
			],
			[
				'id' => 3,
				'group_id' => 2,
				'product_id' => 1
			],
		];

		foreach($items as $item) {
			App\Models\Permission::create($item);
		}
	}
}

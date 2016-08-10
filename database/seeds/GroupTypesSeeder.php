<?php

use Illuminate\Database\Seeder;

class GroupTypesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('group_types')->delete();

		$items = [
			[
				'id' => 1,
				'name' => 'GD'
			],
			[
				'id' => 2,
				'name' => 'DMA'
			],
			[
				'id' => 3,
				'name' => 'DAV'
			],
			[
				'id' => 4,
				'name' => 'DFM'
			]
		];
		
		foreach($items as $item) {
			App\Models\Group_Type::create($item);
		}
	}
}

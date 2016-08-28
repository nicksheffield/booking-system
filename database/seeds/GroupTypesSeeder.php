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
				'code' => 'GD',
				'name' => 'Graphic Design'
			],
			[
				'id' => 2,
				'code' => 'DMA',
				'name' => 'Digital Media Advanced'
			],
			[
				'id' => 3,
				'code' => 'DAV',
				'name' => 'Digital Animation & Video'
			],
			[
				'id' => 4,
				'code' => 'DFM',
				'name' => 'Digital Film Making'
			]
		];
		
		foreach($items as $item) {
			App\Models\Group_Type::create($item);
		}
	}
}

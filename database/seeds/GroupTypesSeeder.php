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
			],
			[
				'id' => 5,
				'code' => 'DAN',
				'name' => 'Digital Animation'
			],
			[
				'id' => 6,
				'code' => 'IC',
				'name' => 'iCreate'
			],
			[
				'id' => 7,
				'code' => 'WE',
				'name' => 'Web Development'
			],
			[
				'id' => 8,
				'code' => 'AFP',
				'name' => 'Animation & Film Production'
			],
			[
				'id' => 9,
				'code' => 'GDW',
				'name' => 'Graphic Design & Web'
			]
		];
		
		foreach($items as $item) {
			App\Models\Group_Type::create($item);
		}
	}
}

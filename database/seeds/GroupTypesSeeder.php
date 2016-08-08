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
				'name' => 'Multimedia'
			],
			[
				'id' => 2,
				'name' => 'Graphic Design'
			]
		];
		
		foreach($items as $item) {
			App\Models\Group_Type::create($item);
		}
	}
}

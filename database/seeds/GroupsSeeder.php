<?php

use Illuminate\Database\Seeder;

class GroupsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('groups')->delete();

		$items = [
			[
				'id' => 1,
				'code' => '16ADAV07',
				'group_type_id' => 1,
				'enrollment_key' => 'blah'
			],
			[
				'id' => 2,
				'code' => '16ADGD02B',
				'group_type_id' => 2,
				'enrollment_key' => 'blah'
			]
		];
		
		foreach($items as $item) {
			App\Models\Group::create($item);
		}
	}
}

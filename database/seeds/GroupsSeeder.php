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
				'code' => '16ADDAV07',
				'group_type_id' => 3,
				'enrollment_key' => 'blah'
			],
			[
				'id' => 2,
				'code' => '16ADGD02B',
				'group_type_id' => 1,
				'enrollment_key' => 'blah'
			],
			[
				'id' => 3,
				'code' => '16ADIC09',
				'group_type_id' => 5,
				'enrollment_key' => 'blah'
			]
		];
		
		$types = DB::table('group_types')->get();
		
		$months = ['02', '04', '07', '09'];
		
		$extra_classes = 5;
		
		for($i=0; $i<$extra_classes; $i++) {
			$type = mt_rand(0, count($types) - 1);
			$month = mt_rand(0, count($months) - 1);
			$items[] = [
				'id' => $items[count($items)-1]['id'] + 1,
				'code' => '16A' . $types[$type]->code . $months[$month],
				'group_type_id' => $types[$type]->id,
				'enrollment_key' => 'blah'
			];
		}
		
		foreach($items as $item) {
			App\Models\Group::create($item);
		}
	}
}

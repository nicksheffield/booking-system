<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class TutorSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('tutor')->delete();

		$items = [
			[
				'id' => 1,
				'user_id' => 2,
				'group_id' => 1,
			],
			[
				'id' => 2,
				'user_id' => 3,
				'group_id' => 2,
			],
		];

		foreach($items as $item) {
			DB::table('tutor')->insert($item);
		}
	}
}

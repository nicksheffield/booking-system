<?php

use Illuminate\Database\Seeder;

class NotesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('notes')->delete();

		$items = [
			[
				'id' => 1,
				'user_id' => 5,
				'writer_id' => 1,
				'content' => 'Did a thing!'
			],
			[
				'id' => 2,
				'user_id' => 5,
				'writer_id' => 1,
				'content' => 'Owes a late fee of $2.50'
			],
			[
				'id' => 3,
				'user_id' => 5,
				'writer_id' => 1,
				'content' => 'Owes a late fee of $5.00'
			],
			[
				'id' => 4,
				'user_id' => 5,
				'writer_id' => 2,
				'revision_of' => 3,
				'content' => 'Owes a late fee of $5.00 (Paid)'
			],
		];

		foreach($items as $item) {
			$item['created_at'] = date('Y-m-d H:i:s');
			$item['updated_at'] = null;

			DB::table('notes')->insert($item);
		}
	}
}

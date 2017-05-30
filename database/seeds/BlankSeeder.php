<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class BlankSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('bookings')->delete();
		DB::table('booking_product')->delete();
		DB::table('group_types')->delete();
		DB::table('groups')->delete();
		DB::table('users')->delete();
		DB::table('product_types')->delete();
		DB::table('products')->delete();
		DB::table('units')->delete();
		DB::table('notes')->delete();

		$items = [
			[
				'id' => 1,
				'name' => 'Admin',
				'email' => 'admin@gmail.com',
				'phone' => '',
				'dob' => null,
				'group_id' => 0,
				'admin' => 2,
				'password' => bcrypt('abcd'),
				'can_book' => 1,
				'can_book_reason' => '',
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			]
		];

		foreach($items as $item) {
			$item['created_at'] = date('Y-m-d H:i:s');
			$item['updated_at'] = null;

			DB::table('users')->insert($item);
		}
	}
}

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

		$users = [
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

		foreach($users as $user) {
			$user['created_at'] = date('Y-m-d H:i:s');
			$user['updated_at'] = null;

			DB::table('users')->insert($user);
		}

		$group_types = [
			[
				'code' => 'DAF',
				'name' => 'Animation and Film Production',
			],
			[
				'code' => 'DSP',
				'name' => 'Screen Production',
			],
			[
				'code' => 'D3DP',
				'name' => '3D Production',
			],
			[
				'code' => 'DWUX',
				'name' => 'Web & UX',
			],
			[
				'code' => 'CIC',
				'name' => 'iCreate',
			],
			[
				'code' => 'DWG',
				'name' => 'Web and Graphics',
			],
			[
				'code' => 'DCDD',
				'name' => 'Creative Digital Design',
			],
			[
				'code' => 'DGM',
				'name' => 'Game Art and Development',
			],
			[
				'code' => 'DMA',
				'name' => 'Digital Media Advanced'
			]
		];


		foreach($group_types as $type) {
			$type['created_at'] = date('Y-m-d H:i:s');
			$type['updated_at'] = null;

			DB::table('group_types')->insert($type);
		}
	}
}

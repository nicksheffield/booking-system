<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class InitSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('users')->delete();
		$this->call(ProductTypesSeeder::class);
		$this->call(ProductsSeeder::class);
		$this->call(GroupTypesSeeder::class);
		$this->call(GroupsSeeder::class);
		$this->call(PermissionsSeeder::class);
		$this->call(UnitsSeeder::class);
		
		$items = [
			[
				'id' => 1,
				'name' => 'Nick Sheffield',
				'email' => 'numbereft@gmail.com',
				'phone' => '',
				'dob' => Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 0,
				'admin' => 2,
				'password' => bcrypt('abcd'),
				'can_book' => 1,
				'can_book_reason' => '',
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			],
			[
				'id' => 2,
				'name' => 'Jonathan Daniels',
				'email' => 'staff@gmail.com',
				'phone' => '',
				'dob' => Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 0,
				'admin' => 1,
				'password' => bcrypt('abcd'),
				'can_book' => 1,
				'can_book_reason' => '',
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			],
			[
				'id' => 3,
				'name' => 'Henry Fox',
				'email' => 'student@gmail.com',
				'phone' => '',
				'dob' => Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 0,
				'admin' => 0,
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

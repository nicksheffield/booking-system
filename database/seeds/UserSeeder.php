<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('users')->delete();

		$items = [
			[
				'id' => 1,
				'username' => 'bobross',
				'first_name' => 'Bob',
				'last_name' => 'Ross',
				'email' => 'test@example.com',
				'admin' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 2,
				'username' => 'henryfox',
				'first_name' => 'Henry',
				'last_name' => 'Fox',
				'email' => 'henry@example.com',
				'phone' => '02112354678',
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 3,
				'username' => 'amandaking',
				'first_name' => 'Amanda',
				'last_name' => 'King',
				'email' => 'amanda@example.com',
				'phone' => '02111953259',
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 4,
				'username' => 'theresamartinez',
				'first_name' => 'Theresa',
				'last_name' => 'Martinez',
				'email' => 'theresa@example.com',
				'phone' => '0219394725',
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 5,
				'username' => 'christopherferguson',
				'first_name' => 'Christopher',
				'last_name' => 'Ferguson',
				'email' => 'chris@example.com',
				'phone' => '0215274321',
				'group_id' => 2,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 6,
				'username' => 'ryanlynch',
				'first_name' => 'Ryan',
				'last_name' => 'Lynch',
				'email' => 'ryan@example.com',
				'phone' => '0215547732',
				'group_id' => 2,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 7,
				'username' => 'meganwalters',
				'first_name' => 'Megan',
				'last_name' => 'Walters',
				'email' => 'megan@example.com',
				'phone' => '02154692364',
				'group_id' => 2,
				'password' => bcrypt('abcd')
			]
		];

		foreach($items as $item) {
			App\Models\User::create($item);
		}
	}
}

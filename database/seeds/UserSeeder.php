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
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'admin' => 2,
				'password' => bcrypt('abcd')
			],[
				'id' => 2,
				'username' => 'graemebibby',
				'first_name' => 'Graeme',
				'last_name' => 'Bibby',
				'email' => 'graeme@example.com',
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'admin' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 3,
				'username' => 'henryfox',
				'first_name' => 'Henry',
				'last_name' => 'Fox',
				'email' => 'henry@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 4,
				'username' => 'amandaking',
				'first_name' => 'Amanda',
				'last_name' => 'King',
				'email' => 'amanda@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 5,
				'username' => 'theresamartinez',
				'first_name' => 'Theresa',
				'last_name' => 'Martinez',
				'email' => 'theresa@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 6,
				'username' => 'christopherferguson',
				'first_name' => 'Christopher',
				'last_name' => 'Ferguson',
				'email' => 'chris@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 2,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 7,
				'username' => 'ryanlynch',
				'first_name' => 'Ryan',
				'last_name' => 'Lynch',
				'email' => 'ryan@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 2,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 8,
				'username' => 'meganwalters',
				'first_name' => 'Megan',
				'last_name' => 'Walters',
				'email' => 'megan@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 2,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 9,
				'username' => 'judithcarter',
				'first_name' => 'Judith',
				'last_name' => 'Carter',
				'email' => 'judith@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 10,
				'username' => 'laurenhansen',
				'first_name' => 'Lauren',
				'last_name' => 'Hansen',
				'email' => 'lauren@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 11,
				'username' => 'samuelbeck',
				'first_name' => 'Samuel',
				'last_name' => 'Beck',
				'email' => 'samuel@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 12,
				'username' => 'kennethstanley',
				'first_name' => 'Kenneth',
				'last_name' => 'Stanley',
				'email' => 'kenneth@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 13,
				'username' => 'cheryljackson',
				'first_name' => 'Cheryl',
				'last_name' => 'Jackson',
				'email' => 'cheryl@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			],
			[
				'id' => 14,
				'username' => 'emilyvasquez',
				'first_name' => 'Emily',
				'last_name' => 'Vasquez',
				'email' => 'emily@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			]
		];

		foreach($items as $item) {
			App\Models\User::create($item);
		}
	}
}

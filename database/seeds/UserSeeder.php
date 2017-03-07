<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

use App\Models\User;

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
			],[
				'id' => 2,
				'name' => 'Graeme Bibby',
				'email' => 'graeme@example.com',
				'phone' => '',
				'id_number' => 0,
				'dob' => Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 0,
				'admin' => 1,
				'password' => bcrypt('abcd'),
				'can_book' => 1,
				'can_book_reason' => '',
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			],[
				'id' => 3,
				'name' => 'Angelo De Marchi',
				'email' => 'angelo@example.com',
				'phone' => '',
				'id_number' => 0,
				'dob' => Carbon::create(rand(1960, 1978), rand(1, 12), rand(1, 28)),
				'group_id' => 0,
				'admin' => 1,
				'password' => bcrypt('abcd'),
				'can_book' => 1,
				'can_book_reason' => '',
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			],[
				'id' => 4,
				'name' => 'Megan Harper',
				'email' => 'megan@example.com',
				'phone' => '',
				'id_number' => 0,
				'dob' => Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 0,
				'admin' => 1,
				'password' => bcrypt('abcd'),
				'can_book' => 1,
				'can_book_reason' => '',
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			],[
				'id' => 5,
				'name' => 'Henry Fox',
				'email' => 'henry@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'admin' => 0,
				'password' => bcrypt('abcd'),
				'can_book' => 0,
				'can_book_reason' => 'Late fee',
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			]
		];
		
		$id = 5;
		$user_count = 0;
		$group_i = 0;
		$person_i = 0;
		$groups = [];
		
		$existing_groups = DB::table('groups')->get();
		
		foreach($existing_groups as $group) {
			$groups[] = [
				'group' => $group,
				'count' => mt_rand(10, 20)
			];
		}
		
		foreach($groups as $group) {
			$user_count += $group['count'];
		}

		$faker = Faker\Factory::create();

		for($i=0; $i<$user_count; $i++) {
			$group = $groups[$group_i];
			$person_i++;
			
			if($person_i == $group['count']) {
				$person_i = 0;
				$group_i++;
			}

			$name = $faker->firstName;
			$surname = $faker->lastName;
			
			$username = strtolower($name).strtolower(substr($surname,0,1)).rand(1,9999);

			$items[] = [
				'id' => ++$id,
				'name' => $name . ' ' . $surname,
				'email' => $username.'@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => $group['group']->id,
				'admin' => 0,
				'password' => bcrypt('abcd'),
				'can_book' => 1,
				'can_book_reason' => '',
				'created_at' => Carbon::now(),
				'updated_at' => Carbon::now()
			];
		}

		// DB::table('users')->insert($items);

		foreach($items as $user) {
			User::create($user);
		}
	}
}

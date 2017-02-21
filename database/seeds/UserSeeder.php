<?php

use Illuminate\Database\Seeder;
use GuzzleHttp\Client;

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
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'admin' => 2,
				'password' => bcrypt('abcd')
			],[
				'id' => 2,
				'name' => 'Graeme Bibby',
				'email' => 'graeme@example.com',
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'admin' => 1,
				'password' => bcrypt('abcd')
			],[
				'id' => 3,
				'name' => 'Angelo De Marchi',
				'email' => 'angelo@example.com',
				'dob' => Carbon\Carbon::create(rand(1960, 1978), rand(1, 12), rand(1, 28)),
				'admin' => 1,
				'password' => bcrypt('abcd')
			],[
				'id' => 4,
				'name' => 'Megan Harper',
				'email' => 'megan@example.com',
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'admin' => 1,
				'password' => bcrypt('abcd')
			],[
				'id' => 5,
				'name' => 'Henry Fox',
				'email' => 'henry@example.com',
				'phone' => '021'.randInt(7),
				'id_number' => randInt(5),
				'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
				'group_id' => 1,
				'password' => bcrypt('abcd')
			]
		];
		
		# Create all the above users
		foreach($items as $item) {
			App\Models\User::create($item);
		}
		
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
		
		# then hit the uinames api to get a random list of names
		$client = new Client();
		$res = $client->request('GET', 'http://uinames.com/api/?region=england&amount='.$user_count);
		$body = json_decode((string)$res->getBody());
		
		if($body) {
			while($person = array_shift($body)) {
				// echo $person->name;
				$group = $groups[$group_i];
				$person_i++;
				
				if($person_i == $group['count']) {
					$person_i = 0;
					$group_i++;
				}
				
				$username = strtolower($person->name).strtolower(substr($person->surname,0,1)).rand(1,9999);
				
				App\Models\User::create([
					'id' => ++$id,
					'name' => $person->name . ' ' . $person->surname,
					'email' => $username.'@example.com',
					'phone' => '021'.randInt(7),
					'id_number' => randInt(5),
					'dob' => Carbon\Carbon::create(rand(1980, 1998), rand(1, 12), rand(1, 28)),
					'group_id' => $group['group']->id,
					'password' => bcrypt('abcd')
				]);
			}
		}
	}
}

<?php

use Illuminate\Database\Seeder;

use App\Models\Group_Type;

class GroupTypesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('group_types')->delete();
		
		Group_Type::create(['id' => 1, 'name' => 'Multimedia']);
		Group_Type::create(['id' => 2, 'name' => 'Graphic Design']);
	}
}

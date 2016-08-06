<?php

use Illuminate\Database\Seeder;

use App\Models\Group_Type as Model;

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
		
		Model::create(['name' => 'Multimedia']);
		Model::create(['name' => 'Graphic Design']);
	}
}

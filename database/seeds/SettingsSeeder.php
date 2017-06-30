<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class SettingsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('settings')->delete();

		$settings = [
			[
				'id' => 1,
				'key' => 'terms',
				'label' => 'Terms and Conditions',
				'val' => 'Please change me',
				'field' => 'wysiwyg'
			]
		];

		foreach($settings as $setting) {
			DB::table('settings')->insert($setting);
		}
	}
}

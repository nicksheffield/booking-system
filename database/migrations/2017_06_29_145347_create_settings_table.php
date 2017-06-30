<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettingsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('settings', function(Blueprint $table) {
			$table->increments('id');
			$table->string('key'); // like a slug. eg, terms
			$table->string('label'); // this is the human readable name for the setting. eg, Terms And Conditions
			$table->mediumText('val'); // this is the value of the setting itself
			$table->string('field'); // this is the type of field you will use while editing
				// supported field values are:
				//  wysiwyg
				//  textarea
				//  text
				//  number
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('settings');
	}
}

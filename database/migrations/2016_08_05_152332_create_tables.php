<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function (Blueprint $table) {
			$table->increments('id');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('email')->unique();
			$table->string('password');
			$table->integer('group_id')->nullable();
			$table->boolean('admin');
			$table->rememberToken();
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('password_resets', function (Blueprint $table) {
			$table->string('email')->index();
			$table->string('token')->index();
			$table->timestamp('created_at')->nullable();
		});
		
		Schema::create('group_types', function (Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('groups', function (Blueprint $table) {
			$table->increments('id');
			$table->string('code')->unique();
			$table->integer('group_type_id');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('permissions', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('group_id');
			$table->integer('product_id');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('product_types', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('products', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name');
			$table->integer('product_type_id');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('units', function(Blueprint $table) {
			$table->increments('id');
			$table->string('unit_number');
			$table->integer('product_id');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('bookings', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('student_id');
			$table->integer('unit_id');
			$table->timestamp('delivered_at')->nullable();
			$table->timestamp('returned_at')->nullable();
			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
		Schema::drop('password_resets');
		Schema::drop('group_types');
		Schema::drop('groups');
		Schema::drop('permissions');
		Schema::drop('product_types');
		Schema::drop('products');
		Schema::drop('units');
		Schema::drop('bookings');
	}
}

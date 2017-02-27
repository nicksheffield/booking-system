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
			$table->string('name');
			$table->string('email')->unique();
			$table->string('phone');
			$table->string('id_number');
			$table->date('dob');
			$table->string('password');
			$table->integer('group_id')->nullable();
			$table->boolean('admin');
			$table->boolean('can_book')->default(true);
			$table->string('can_book_reason');
			$table->rememberToken();
			$table->timestamps();
			$table->softDeletes();
		});

		Schema::create('notes', function(Blueprint $table) {
			$table->increments('id');
			$table->mediumText('content');
			$table->integer('user_id');
			$table->integer('writer_id');
			$table->integer('revision_of')->nullable();
			$table->boolean('is_old');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('tutor', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id');
			$table->integer('group_id');
			$table->timestamps();
		});
		
		Schema::create('password_resets', function (Blueprint $table) {
			$table->string('email')->index();
			$table->string('token')->index();
			$table->timestamp('created_at')->nullable();
		});
		
		Schema::create('group_types', function (Blueprint $table) {
			$table->increments('id');
			$table->string('code');
			$table->string('name');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('groups', function (Blueprint $table) {
			$table->increments('id');
			$table->string('code');
			$table->integer('group_type_id');
			$table->string('enrollment_key');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('permissions', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('group_id');
			$table->integer('product_id');
			$table->integer('quantity');
			$table->integer('days_allowed');
			$table->timestamps();
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
			$table->string('image');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('units', function(Blueprint $table) {
			$table->increments('id');
			$table->string('serial_number');
			$table->string('asset_number');
			$table->string('unit_number');
			$table->integer('product_id');
			$table->mediumText('notes');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('bookings', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('user_id');
			$table->timestamp('taken_at')->nullable();
			$table->timestamp('pickup_at')->nullable();
			$table->timestamp('closed_at')->nullable();
			$table->timestamp('due_at')->nullable();
			$table->timestamp('cancelled_at')->nullable();
			$table->integer('created_by_id');
			$table->integer('issued_by_id');
			$table->integer('closed_by_id')->nullable();
			$table->integer('cancelled_by_id');
			$table->timestamps();
			$table->softDeletes();
		});
		
		Schema::create('booking_product', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('booking_id');
			$table->integer('product_id');
			$table->integer('unit_id');
			$table->string('notes');
			$table->timestamp('returned_at')->nullable();
			$table->integer('returned_by_id')->nullable();
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
		Schema::drop('tutor');
		Schema::drop('users');
		Schema::drop('notes');
		Schema::drop('units');
		Schema::drop('groups');
		Schema::drop('products');
		Schema::drop('bookings');
		Schema::drop('group_types');
		Schema::drop('permissions');
		Schema::drop('product_types');
		Schema::drop('password_resets');
		Schema::drop('booking_product');
	}
}

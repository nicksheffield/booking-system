<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupTypeProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::drop('permissions');

        Schema::create('group_type_product', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('group_type_id');
			$table->integer('product_id');
			$table->integer('quantity');
			$table->integer('days_allowed');
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
        Schema::drop('group_type_product');
    }
}

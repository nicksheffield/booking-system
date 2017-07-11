<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTakenFieldToBookingProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('booking_product', function(Blueprint $table) {
			$table->boolean('taken');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('booking_product', function(Blueprint $table) {
			$table->dropColumn('taken');
		});
    }
}

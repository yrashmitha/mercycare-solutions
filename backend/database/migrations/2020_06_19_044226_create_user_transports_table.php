<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTransportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_transports', function (Blueprint $table) {
            $table->uuid('user_id');
            $table->bigInteger('transport_id')->unsigned();
            $table->integer('price_per_km');
            $table->timestamps();
        });

        Schema::table('user_transports',function (Blueprint $table){
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('transport_id')->references('id')->on('transports');
            $table->primary(['user_id', 'transport_id']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_transports');
    }
}

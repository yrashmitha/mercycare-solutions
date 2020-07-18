<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointment_details', function (Blueprint $table) {
            $table->uuid('appointment_id')->primary();
            $table->bigInteger('transport_id')->unsigned()->default(null);
            $table->string('patient_geo_cords_as_string')->default(null);
            $table->string('user_geo_cords_as_string')->default(null);
            $table->float('distance')->default(null);
            $table->float('price')->default(null);
            $table->boolean('patient_completed')->default(0);
            $table->boolean('user_completed')->default(0);
            $table->bigInteger('appointment_status')->unsigned();
            $table->timestamps();
        });

        Schema::table('appointment_details',function (Blueprint $table){
            $table->foreign('appointment_id')->references('id')->on('appointments');
            $table->foreign('transport_id')->references('id')->on('transports');
            $table->foreign('appointment_status')->references('id')->on('appointment_statuses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointment_details');
    }
}

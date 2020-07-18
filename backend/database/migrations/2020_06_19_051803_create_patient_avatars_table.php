<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientAvatarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_avatars', function (Blueprint $table) {
            $table->uuid('patient_id');
            $table->string('path');
            $table->timestamps();
        });

        Schema::table('patient_avatars',function (Blueprint $table){
            $table->foreign('patient_id')->references('id')->on('patients');
            $table->primary(['patient_id']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patient_avatars');
    }
}

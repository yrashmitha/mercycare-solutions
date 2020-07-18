<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('mobile_num');
            $table->string('email')->unique()->default(null);
            $table->string('code')->default(null);
            $table->boolean('active')->default(0);
            $table->string('password');
            $table->string('f_name');
            $table->string('l_name');
            $table->string('nic')->default(null);
            $table->string('title');
            $table->string('address');
            $table->string('geo_cords')->default(null);
            $table->string('path')->default("");
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
        Schema::dropIfExists('patients');
    }
}

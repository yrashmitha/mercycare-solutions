<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_members', function (Blueprint $table) {
            $table->uuid('patient_id');
            $table->uuid('member_id');
            $table->string('id')->default(null);
            $table->timestamps();
        });
        Schema::table('patient_members',function (Blueprint $table){
            $table->foreign('patient_id')->references('id')->on('users');
            $table->foreign('member_id')->references('id')->on('users');
            $table->primary(['patient_id','member_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patient_members');
    }
}

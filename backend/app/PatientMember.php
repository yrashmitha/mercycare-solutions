<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class PatientMember extends Model
{
    use Uuid;
    public $incrementing = false;

    protected $fillable = [
        'patient_id', 'member_id','id'
    ];
}

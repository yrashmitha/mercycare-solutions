<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class PatientAvatar extends Model
{
    use Uuid;
    public $incrementing = false;
    protected $fillable = [
        'patient_id','path'
    ];
    protected $table = 'patient_avatars';
    protected $primaryKey = 'patient_id';

    public function getPatientAvatarAndName($patientId)
    {
        $patient=Patients::find($patientId);
        $name=$patient->title." ".$patient->f_name;
        $p=PatientAvatar::where('patient_id',$patientId)->first()->path;
        return response()->json(["path"=>$p,"name"=>$name]);
    }
}

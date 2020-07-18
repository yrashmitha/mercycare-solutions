<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AppointmentDetails extends Model
{
    use Uuid;
    public $incrementing = false;
    protected $table = 'appointment_details';


    protected $primaryKey = 'appointment_id';
    protected $keyType = 'string';


    protected $fillable = [
        'appointment_id', 'user_id', 'patient_id','transport_id','patient_geo_cords_as_string','address','extra_message',
        'user_completed','patient_completed'
    ];


    public function trackingStart($appointmentId)
    {
        $success=true;
        DB::beginTransaction();
        try{
            AppointmentDetails::where('appointment_id',$appointmentId)
                ->update([
                    'tracking_enabled'=>1
                ]);
            Appointment::where('id',$appointmentId)->update([
                'appointment_status_id'=>3
            ]);

            DB::commit();
        }catch (\Exception $e){
            $success=false;
            return response()->json(['msg'=>$e->getMessage()]);
        }
        if ($success==true){
            return response()->json(["status"=>'OK','msg'=>'Tracking enabled successfully!']);
        }
        else{
            return response()->json(['msg'=>'Error occurred!']);
        }
    }

    public function trackingStop($appointmentId)
    {
        $success=true;
        DB::beginTransaction();
        try{
            AppointmentDetails::where('appointment_id',$appointmentId)
                ->update([
                    'tracking_enabled'=>0
                ]);
            Appointment::where('id',$appointmentId)->update([
                'appointment_status_id'=>2
            ]);

            DB::commit();
        }catch (\Exception $e){
            $success=false;
            return response()->json(['msg'=>$e->getMessage()]);
        }
        if ($success==true){
            return response()->json(["status"=>'OK','msg'=>'Tracking disabled successfully!']);
        }
        else{
            return response()->json(['msg'=>'Error occurred!']);
        }
    }

    public function appointment()
    {
        return $this->hasOne("App\Appointment",'id','appointment_id');
    }

    public function userTransport()
    {
        return $this->hasOne("App\UserTransport",'transport_id','transport_id');
    }

}

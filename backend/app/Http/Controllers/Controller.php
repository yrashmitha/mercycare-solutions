<?php

namespace App\Http\Controllers;

use App\AppointmentDetails;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function time()
    {
        $mutable = Carbon::now();
        $date=AppointmentDetails::where("appointment_id",'c2c0d02b-8d82-4a31-87a4-80d0c24f88f4')->get();
        $c_time= Carbon::create($date[0]->appointment_time);
        return $c_time->diffForHumans();

        $modifiedMutable = $mutable->add(1, 'hour');
        AppointmentDetails::where("appointment_id",'c2c0d02b-8d82-4a31-87a4-80d0c24f88f4')->update([
            "appointment_time"=>$modifiedMutable
        ]);
        return "ok";
    }
}

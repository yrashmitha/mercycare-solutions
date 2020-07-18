<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\AppointmentDetails;
use App\Patients;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    public function index()
    {
        return response()->json(Auth::guard('api')->user()->getAuthIdentifier());
    }

    public function create(Request $request)
    {

        $patientId=$request->input("patient_id");
        $userId=$request->input("user_id");
        $patientGeoCoords=$request->input("patient_geo_cords_as_string");
        $extraMessage=$request->input("extra_message");
        $address=$request->input('address');
        $patientUId=$request->input('fire_patient_uid');

        $app=new Appointment();
        $res=$app->createAppointment($patientId,$patientUId,$userId,$patientGeoCoords,$extraMessage,$address);
        return $res;
    }

    public function getAllPatientAppointments($id)
    {
        $app=new Appointment();
        $res= $app->getAllPatientAppointments($id);
        return $res;
    }

    public function getAllUserAppointments($id)
    {
        $user=new User();
        $res=$user->getAllUserAppointments($id);
        return $res;
    }

    public function getAppointmentData($id)
    {
        $app=new Appointment();
        $res=$app->getAppointmentData($id);
        return $res;
    }

    public function approveAppointment(Request $request,$id)
    {
//        return $request;
        $appointmentId=$id;
        $distance=$request->distance;
        $duration=$request->duration;
        $userGeoCoords=$request->user_geo_coords;
        $transportId=$request->transport_id;
        $userFireUid=$request->user_fire_uid;
       $app=new Appointment();
       $res=$app->approveAppointment($distance,$duration,$userGeoCoords,$appointmentId,$transportId,$userFireUid);
       return $res;
    }

    public function trackingStart($id)
    {
        $app=new AppointmentDetails();
        $res=$app->trackingStart($id);
        return $res;
    }

    public function trackingStop($id)
    {
        $app=new AppointmentDetails();
        $res=$app->trackingStop($id);
        return $res;
    }

    public function patientComplete($id)
    {
        $app=new Appointment();
        $res=$app->patientCompleteAppointment($id);
        return $res;
    }

    public function userComplete(Request $request,$id)
    {
        $time=$request->time;
        $app=new Appointment();
        $res=$app->userCompleteAppointment($id,$time);
        return $res;
    }


}

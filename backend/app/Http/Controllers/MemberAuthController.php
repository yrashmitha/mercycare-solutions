<?php

namespace App\Http\Controllers;

use App\Patients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MemberAuthController extends Controller
{
    public function register(Request $request)
    {
        $patient_id=Auth::guard('patients')->user()->getAuthIdentifier();
        $mobile_num=$request->mobile_num;
        $email=$request->email;
        $password=bcrypt($request->password);
        $f_name=$request->f_name;
        $l_name=$request->l_name;
        $nic=$request->nic;
        $title=$request->title;
        $address=$request->address;
        $geo_cords=$request->geo_coords;


        $p=new Patients();
        return $p->createMemberPatient($patient_id,$email,$password,$f_name,$l_name,$mobile_num,$nic,$title,$address,$geo_cords);
    }

    public function deleteMemner(Request $request)
    {
        $patient_id=Auth::guard('patients')->user()->getAuthIdentifier();
        $mobile_num=$request->mobile_num;
        $email=$request->email;
        $password=bcrypt($request->password);
        $f_name=$request->f_name;
        $l_name=$request->l_name;
        $nic=$request->nic;
        $title=$request->title;
        $address=$request->address;
        $geo_cords=$request->geo_coords;


        $p=new Patients();
        return $p->createMemberPatient($patient_id,$email,$password,$f_name,$l_name,$mobile_num,$nic,$title,$address,$geo_cords);
    }
}

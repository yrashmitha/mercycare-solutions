<?php

namespace App\Http\Controllers;

use App\Patients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MemberDataController extends Controller
{
    public function getMyAllMembers()
    {
        $p=new Patients();
        return $p->getMyMembers(Auth::guard('patients')->user()->getAuthIdentifier());
    }

    public function updateMember(Request $request,$id)
    {
//        return $request->geo_coords;
        $mobile_num=$request->mobile_num;
        $email=$request->email;
        $f_name=$request->f_name;
        $l_name=$request->l_name;
        $title=$request->title;
        $address=$request->address;
        $geo_cords=$request->geo_coords;
        $p=new Patients();
        return $p->updateMemberPatientProfile($id,$email,$f_name,$l_name,$mobile_num,$title,$address,$geo_cords);
    }
}

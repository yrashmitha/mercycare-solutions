<?php

namespace App\Http\Controllers;

use App\PatientMember;
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

    public function deleteMember(Request $request,$id)
    {
//        return $request->geo_coords;
        $pid = Auth::guard('patients')->user()->getAuthIdentifier().'mercy'.$id;
        $m = PatientMember::where('id',$pid)->delete();
        return response()->json('Successfully deleted.');
    }
}

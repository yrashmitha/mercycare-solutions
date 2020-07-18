<?php

namespace App\Http\Controllers;

use App\PatientAvatar;
use App\Patients;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
//use Tymon\JWTAuth\JWTAuth;



class PatientAuthController extends Controller
{

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|unique:patients',
        ]);

        if ($validator->fails()) {
            return response()->json(["msg"=>'Entered email is already taken.']);
        }
        else {
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
            return $p->createPatient($email,$password,$f_name,$l_name,$mobile_num,$nic,$title,$address,$geo_cords);
        }


    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

//        if (Auth::guard('patients')->attempt($credentials)){
//            $user=Auth::guard('patients')->user();
//
//            return response()->json(["patient"=>$user]);
//        }

        if ($token=Auth::guard('patients')->attempt($credentials)) {
            if (Auth::guard('patients')->user()->active ==1){
                return $this->respondWithToken($token);
            }
            else{
                $number=Auth::guard('patients')->user()->mobile_num;
                return  response()->json(["status"=>1,"msg"=>"Verify your mobile number.","number"=>$number]);
            }
        }
        return  response()->json(["status"=>0,"msg"=>"Email and password doesn't match."]);
    }

    public function otpVerify(Request $request)
    {
//        return $request;
        $number=$request->phone_number;
        $code=$request->code;

        $patient=Patients::where('mobile_num',$number)->first();
        $realCode=$patient->code;
        if ($realCode === $code){
            $patient->code=null;
            $patient->active=1;
            $patient->save();
            return  response()->json(["status"=>1,"msg"=>"Account activated. You can log in now."]);
        }
        else{
            return  response()->json(["status"=>0,"msg"=>"Code does not match."]);
        }
    }

    public function me()
    {
        $res=Auth::user();
        return $res;
    }




    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }




    public function guard()
    {
        return Auth::guard();
    }
}

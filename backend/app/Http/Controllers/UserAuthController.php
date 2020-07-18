<?php

namespace App\Http\Controllers;

use App\PatientAvatar;
use App\User;
use App\UserAvatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserAuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $success=true;
        DB::beginTransaction();
        try{
            $user=new User();
            $user->name=$request->name;
            $user->email=$request->email;
//            $user->user_name=$request->user_name;
            $user->password=bcrypt($request->password);
            $user->status_id=$request->status_id;
            $user->role_id=$request->role_id;
            $user->address=$request->address;
            $user->phone_num=$request->phone_num;
            $user->price_per_hour=$request->price_per_hour;
            $user->save();

            $avatar=new UserAvatar();
            $avatar->user_id = $user->id;
            $avatar->save();


//        $basic  = new \Nexmo\Client\Credentials\Basic('f5fef0c2', 'iQmTcVtHOVHiME7r');
//        $client = new \Nexmo\Client($basic);
//        $client->message()->send([
//            'to'   => $request->mobile_num,
//            'from' => 'MercyCare Solutions',
//            'text' => 'Your verification code is '.$code
//        ]);
        }catch (\Exception $e){
            $success=false;
            DB::rollBack();
            return response()->json($e->getMessage());
        }
        if ($success==true){
            DB::commit();
            return response()->json(['msg'=>"Registered successfully.","user"=>$user]);
        }
        else{
            return response()->json(['msg'=>"Error occurred."]);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = auth()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }
        return  response()->json("failed");
    }

    public function me()
    {
        return Auth::user();
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60,
        ]);
    }

    public function guard()
    {
        return Auth::guard();
    }
}

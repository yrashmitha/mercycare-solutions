<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Contracts\JWTSubject;


class Patients extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use Uuid;
    public $incrementing = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email','f_name','l_name','title','nic','phone_num','address'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password','code'
    ];


    public function getPatientProfile($patientId)
    {
        $res = DB::table('patients')->where('id','=',$patientId)
            ->join('patient_avatars', 'patient_avatars.patient_id', '=', 'patients.id')
            ->select('patients.mobile_num',  'patients.nic',  'patients.title',  'patients.address',
                'patients.email',  'patients.f_name',  'patients.l_name','patients.geo_cords',
                'patient_avatars.path'
            )->get();
        return response()->json($res);
    }

    public function createPatient($email,$password,$firstName,$lastName,$mobileNumber,$nic,$title,$address,$geoCoords){
        $success=true;
        DB::beginTransaction();
        try{
            $patinet=new Patients();
            $patinet->mobile_num=$mobileNumber;
            $patinet->email=$email;
            $patinet->password=$password;
            $patinet->f_name=$firstName;
            $patinet->l_name=$lastName;
            $patinet->nic=$nic;
            $patinet->title=$title;
            $patinet->address=$address;
            $patinet->geo_cords=$geoCoords;
//            $patinet->role_id=2;

            $code=substr(str_shuffle("0123456789"), 0, 5);

            $patinet->code=$code;
            $patinet->save();

            $avatar=new PatientAvatar();
            $avatar->patient_id = $patinet->id;
            $avatar->save();

//            $basic  = new \Nexmo\Client\Credentials\Basic('f5fef0c2', 'iQmTcVtHOVHiME7r');
//            $client = new \Nexmo\Client($basic);
//            $client->message()->send([
//                'to'   => $request->mobile_num,
//                'from' => 'MercyCare Solutions',
//                'text' => 'Your verification code is '.$code
//            ]);

            DB::commit();


        }catch (\Exception $e){
            DB::rollBack();
            $success=false;
            return response()->json($e->getMessage());
        }
        if ($success==true){
            return response()->json(['msg'=>"Registered successfully.","patient"=>$patinet]);
        }
        else{
            return response()->json(['msg'=>"Some error"]);
        }
    }

    public function createMemberPatient($currentPatientId,$email,$password,$firstName,$lastName,$mobileNumber,$nic,$title,$address,$geoCoords){

        $success=true;
        DB::beginTransaction();
        try{
            $patinet=new Patients();
            $patinet->mobile_num=$mobileNumber;
            $patinet->email=$email;
            $patinet->password=$password;
            $patinet->f_name=$firstName;
            $patinet->l_name=$lastName;
            $patinet->nic=$nic;
            $patinet->title=$title;
            $patinet->address=$address;
            $patinet->geo_cords=$geoCoords;

            //generating otp code
//            $code=substr(str_shuffle("0123456789"), 0, 5);

            //$patinet->code=null;
            $patinet->save();
            $id=$patinet->id;

//            return $patinet->id;
            $member=new PatientMember();
            $member->patient_id=$currentPatientId;
            $member->member_id=$id;
            $member->id=$currentPatientId."mercy".$patinet->id;
            $member->save();


            $avatar=new PatientAvatar();
            $avatar->patient_id = $patinet->id;
            $avatar->save();

//            $basic  = new \Nexmo\Client\Credentials\Basic('f5fef0c2', 'iQmTcVtHOVHiME7r');
//            $client = new \Nexmo\Client($basic);
//            $client->message()->send([
//                'to'   => $request->mobile_num,
//                'from' => 'MercyCare Solutions',
//                'text' => 'Your verification code is '.$code
//            ]);

            DB::commit();


        }catch (\Exception $e){
            DB::rollBack();
            $success=false;
            return response()->json($e->getMessage());
        }
        if ($success==true){
            return response()->json(['msg'=>"Added successfully.","patient"=>$patinet]);
        }
        else{
            return response()->json(['msg'=>"Some error"]);
        }
    }

    public function getMyMembers($patientId)
    {
        $qry="SELECT * FROM `patients`,patient_members WHERE patient_members.patient_id= ? AND patients.id=patient_members.member_id";
        $res=DB::select($qry,array(
            0=>$patientId
        ));
        return response()->json($res);
    }

    public function loginPatient($request)
    {

    }


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            "f_name"=>$this->f_name,
            "email"=>$this->email,
            "id"=>$this->id,
            "nic"=>$this->nic,

        ];
    }


    public function appointments()
    {
        return $this->hasMany("App\Appointment",'patient_id','id');
    }


}

<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
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
        'name', 'email', 'password', 'price_per_hour','status_id'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

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
            "name" => $this->name,
            "email" => $this->email,
            "id" => $this->id,
            "role" => $this->role_id
        ];
    }

    public function checkAnotherOngoingAppointments($userId)
    {
        $qry = "SELECT id from appointments where user_id= ? AND appointment_status_id IN (2,3)";
        $res = DB::select($qry, array(
            0 => $userId
        ));
        $total = count($res);
        return $total;
    }

    public function getUserProfile($userId)
    {
        $userData = DB::table('users')->where('id', '=', $userId)
            ->join('user_avatars', 'user_avatars.user_id', '=', 'users.id')
            ->select('users.phone_num', 'users.name', 'users.price_per_hour', 'users.status_id',
                'user_avatars.path'
            )->get()[0];
        $transportTypesDetails = DB::table('user_transports')->where('user_id', '=', $userId)
            ->join('transports', 'transports.id', '=', 'user_transports.transport_id')
            ->select('transports.id', 'transports.transport_type', 'user_transports.price_per_km'

            )->get();

        $userspecializations = DB::table('user_specializations')->where('user_id', '=', $userId)
            ->join('specializations', 'id', '=', 'user_specializations.specialization_id')
            ->select('specializations.specialization_name', 'specializations.id'

            )->get();
        $allTransportTypes = DB::table('transports')
            ->select('transports.id', 'transports.transport_type'

            )->get();

//        $allSpecializations = DB::table('specializations')
//            ->select('specializations.id',  'specializations.specialization_name'
//
//            )->get();
        return response()->json(["user" => $userData, "transportDetails" => $transportTypesDetails, "specializationDetails" => $userspecializations
            , "allTransportTypes" => $allTransportTypes,
//            'allSpecializations'=>$allSpecializations
        ]);
    }

    public function getAllUserAppointments($userId)
    {
        $res = DB::table('appointments')->where('user_id', '=', $userId)
            ->join('patients', 'patients.id', '=', 'appointments.patient_id')
            ->join('appointment_statuses', 'appointment_statuses.id', '=', 'appointments.appointment_status_id')
            ->select('appointments.*', 'appointment_statuses.appointment_status', 'patients.f_name')->orderByDesc('created_at')
            ->get();
        return response()->json($res);
    }

    public function updateUserData($name, $price_per_hour, $status_id)
    {
        try {
            $user = User::find(Auth::user()->getAuthIdentifier());
            $status = $user->status_id;

            if ($status_id == 1) {
                $user->update([
                    'name' => $name,
                    'price_per_hour' => $price_per_hour,
                    'status_id' => 3
                ]);
            } else {
                if ($status == 3){
                    $user->update([
                        'name' => $name,
                        'price_per_hour' => $price_per_hour,
                        'status_id' => 1
                    ]);
                }
                else{
                    $user->update([
                        'name' => $name,
                        'price_per_hour' => $price_per_hour,
                    ]);
                }

            }
            return response()->json(["msg" => "Details updated successfully"]);

        } catch (\Exception $e) {
            return response()->json(["msg" => $e->getMessage()]);
        }


    }

    public function appointments()
    {
        $this->hasMany('App\Appointments', 'user_id', 'id');
    }

    public function userTransports()
    {
        return $this->hasMany("App\UserTransport", 'user_id', 'id');
    }


}

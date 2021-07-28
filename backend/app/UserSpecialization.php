<?php

namespace App;

use Carbon\Carbon;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserSpecialization extends Model
{
    use Uuid;
    public $incrementing = false;
    protected $fillable = [
        'user_id',
        'specialization_id'
    ];
    protected $primaryKey = "user_id";

    public function updateSpecialization($specializationArray){
        $arr=explode(',',$specializationArray);
        $success=true;
        DB::beginTransaction();
        try{
            $userId=Auth::user()->getAuthIdentifier();

            //deleting previous user specializations
            UserSpecialization::where('user_id',$userId)->delete();

            //inserting new user specilizations
            foreach ($arr as $obj){
                $s = new UserSpecialization();
                $s->user_id = $userId;
                $s->specialization_id = $obj;
                $s->save();
//               $qry="INSERT INTO `user_specializations`(`user_id`, `specialization_id`, `created_at`) VALUES (?,?,?)";
//               $res=DB::select($qry,array(
//                   0=>$userId,
//                   1=>$obj,
//                   2=>Carbon::now()
//               ));
            }
        }catch (\Exception $e){
            DB::rollBack();
            return response()->json(["msg"=>$e->getMessage()]);
            $success=false;
        }
        if ($success==true){
            DB::commit();
            return response()->json(["msg"=>"Specialization list updated."]);

        }

    }
}

<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserTransport extends Model
{
    public $incrementing = false;
    use Uuid;
    protected $fillable = [
        'user_id', 'transport_id',
    ];







    public function changePricePerKm($transportId,$price)
    {
        try{
            $res=UserTransport::where('user_id',Auth::user()->getAuthIdentifier())
                ->where('transport_id',$transportId)
                ->update([
                    'price_per_km'=>$price
                ]);
            return  response()->json(["msg"=>"Updated successfully."]);
        }catch (\Exception $e){
            return response()->json(["msg"=>$e->getMessage()]);
        }
    }

    public function deleteTransportType($transportId)
    {
        try{
            $res=UserTransport::where('user_id',Auth::user()->getAuthIdentifier())
                ->where('transport_id',$transportId)
                ->delete();
            AppointmentDetails::where('transport_id',$transportId)->update([
                'transport_id'=>5
            ]);
            return  response()->json(["msg"=>"Deleted successfully."]);
        }catch (\Exception $e){
            return response()->json($e->getMessage());
        }
    }

    public function addNewTransport($transportId,$price)
    {
        try{
            $qry="INSERT INTO `user_transports`(`user_id`, `transport_id`, `price_per_km`) VALUES (?,?,?) ";
            $res=DB::select($qry,array(
                0=>Auth::user()->getAuthIdentifier(),
                1=>$transportId,
                2=>$price
            ));
            return  response()->json(["msg"=>"New transport method added successfully."]);
        }catch (\Exception $e){
            return response()->json(["msg"=>'Error occurred. Code is '.$e->getCode()]);
        }
    }

    public function users()
    {
        return $this->belongsTo("App\User",'id','user_id');
    }
}

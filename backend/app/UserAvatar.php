<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;

class UserAvatar extends Model
{
    use Uuid;
    public $incrementing = false;
    protected $primaryKey = 'user_id';

    public function getUserAvatarAndName($userId)
    {
        $p=UserAvatar::where('user_id',$userId)->first()->path;
        $user=User::find($userId);
        $name=$user->name;
        return response()->json(["path"=>$p,"name"=>$name]);
    }

}

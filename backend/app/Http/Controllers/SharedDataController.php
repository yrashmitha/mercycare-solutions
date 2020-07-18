<?php

namespace App\Http\Controllers;

use App\Role;
use App\Specialization;
use App\Transport;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SharedDataController extends Controller
{
    public function getSpecializations()
    {
        $results = DB::table('specializations')->select('id', 'specialization_name')->get();
        return response()->json($results);
    }

    public function searchDefault(Request $request)
    {
        $doctor = $request->input('name');
        $type = $request->input('type');
        $specialization = $request->input('specialization');
        $limit = $request->paginator["limit"];
        $offset = $request->paginator["skip"];


        if ($doctor == null && $type == null && $specialization == null) {
            $qry = "select users.id,users.name,users.phone_num,users.email,roles.role_name,statuses.status_name,user_avatars.path from users,roles,statuses,user_avatars
 where users.role_id =roles.id and users.status_id=statuses.id and user_avatars.user_id=users.id LIMIT $limit OFFSET $offset";

            $qry2 = "select users.id,users.name,users.phone_num,users.email,roles.role_name,statuses.status_name from users,roles,statuses
 where users.role_id =roles.id and users.status_id=statuses.id";
            $results2 = DB::select($qry2);
             $results = DB::select($qry);
            $total=count($results2);
            return response()->json(["data"=>$results,"count"=>$total]);
        }

        if ($doctor != null && $type == null && $specialization == null) {
            $results = DB::table('users')->Where('name', 'like', '%' . $doctor . '%')
                ->join('user_avatars','user_avatars.user_id','=','users.id')
                ->join('roles','roles.id','=','users.role_id')
                ->join('statuses','statuses.id','=','users.status_id')
                ->select('users.name','users.id',
                    'users.name','users.phone_num','users.email','roles.role_name','statuses.status_name','user_avatars.path')
                ->limit($limit)
            ->offset($offset)->get();
            $results2= $result = DB::table('users')->Where('name', 'like', '%' . $doctor . '%')->get();
            $total=count($results2);
            return response()->json(["data"=>$results,"count"=>$total]);
        }

        if ($doctor == null && $type != null && $specialization == null) {
            $qry = "select users.id,users.name,users.phone_num,users.email,roles.role_name,statuses.status_name,user_avatars.path from users,roles,statuses,user_avatars where users.role_id =(select roles.id from roles where roles.role_name =?)
 AND users.role_id =roles.id and users.status_id=statuses.id and user_avatars.user_id=users.id
 LIMIT $limit OFFSET $offset";
            $results = DB::select($qry, array(
                0 => $type,
            ));
            $qry2 = "select users.* from users where users.role_id =(select roles.id from roles where roles.role_name =?)";
            $results2 = DB::select($qry2, array(
                0 => $type,
            ));
            $total=count($results2);
            return response()->json(["data"=>$results,"count"=>$total]);
        }

        if ($doctor == null && $type == null && $specialization != null) {
            $qry = "select users.id,users.name,users.phone_num,users.email,roles.role_name,statuses.status_name,user_avatars.path from users,roles,statuses,user_avatars where users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = ? )) 
 AND users.role_id =roles.id and users.status_id=statuses.id and user_avatars.user_id=users.id
 LIMIT $limit OFFSET $offset";
            $results = DB::select($qry, array(
                0 => $specialization,
            ));
            $qry2 = "select users.* from users where users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = ? ))";
            $results2 = DB::select($qry2, array(
                0 => $specialization,
            ));
            $total=count($results2);
            return response()->json(["data"=>$results,"count"=>$total]);
        }

        if ($doctor != null && $type != null && $specialization == null) {
//
            $qry = "select users.id,users.name,users.phone_num,users.email,roles.role_name,statuses.status_name,user_avatars.path from users,roles,statuses,user_avatars
 where users.name like ? and users.role_id =(select roles.id from roles where roles.role_name = ?) 
 AND users.role_id =roles.id and users.status_id=statuses.id and user_avatars.user_id=users.id
 LIMIT $limit OFFSET $offset";
            $results = DB::select($qry, array(
                0 => "%$doctor%",
                1 => $type
            ));
            $qry2 = "select users.* from users where users.name like ? and users.role_id =(select roles.id from roles where roles.role_name = ?)";
            $results2 = DB::select($qry2, array(
                0 => "%$doctor%",
                1 => $type
            ));
            $total=count($results2);
            return response()->json(["data"=>$results,"count"=>$total]);
        }

        if ($doctor != null && $type == null && $specialization != null) {
//
            $qry = "select users.id,users.name,users.phone_num,users.email,roles.role_name,statuses.status_name,user_avatars.path from users,roles,statuses,user_avatars
 where  users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = ? ))
AND users.role_id =roles.id and users.status_id=statuses.id and user_avatars.user_id=users.id 
and users.name like ? LIMIT $limit OFFSET $offset";
            $results = DB::select($qry, array(
                0 => $specialization,
                1 => "%$doctor%",
            ));
            $qry2 = "select users.* from users where  users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = ? ))
and
users.name like ?";
            $results2 = DB::select($qry2, array(
                0 => $specialization,
                1 => "%$doctor%",
            ));
            $total=count($results2);
            return response()->json(["data"=>$results,"count"=>$total]);

        }

        if ($doctor == null && $type != null && $specialization != null) {

            $qry = "select users.id,users.name,users.phone_num,users.email,roles.role_name,statuses.status_name,user_avatars.path 
from users,roles,statuses,user_avatars
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = ? ))
and users.role_id =(select roles.id from roles where roles.role_name =?) 
AND users.role_id =roles.id and users.status_id=statuses.id and user_avatars.user_id=users.id 
LIMIT $limit OFFSET $offset";
            $results = DB::select($qry, array(
                0 => $specialization,
                1 => $type
            ));

            $qry2 = "select users.* from users
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = ? ))
and
users.role_id =(select roles.id from roles where roles.role_name =?)";
            $results2 = DB::select($qry2, array(
                0 => $specialization,
                1 => $type
            ));
            $total=count($results2);
            return response()->json(["data"=>$results,"count"=>$total]);
        }


        if ($doctor != null && $type != null && $specialization != null) {
//
            $qry = "select users.id,users.name,users.phone_num,users.email,roles.role_name,statuses.status_name,user_avatars.path 
from users,roles,statuses,user_avatars,user_specializations,specializations
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = ? ))
and
users.role_id =(select roles.id from roles where roles.role_name =?)
and
users.name like ?
and
specializations.id=user_specializations.specialization_id
and
users.id=user_specializations.user_id
 and users.role_id =roles.id and users.status_id=statuses.id and user_avatars.user_id=users.id 
 LIMIT $limit OFFSET $offset";
            $results = DB::select($qry, array(
                0 => $specialization,
                1 => $type,
                2 => "%$doctor%",
            ));

            $qry2 = "select users.name,users.id,specializations.specialization_name from user_specializations,users,specializations
where 
users.id in (select user_specializations.user_id from user_specializations
where user_specializations.specialization_id = (select specializations.id 
from specializations where specializations.specialization_name = ? ))
and
users.role_id =(select roles.id from roles where roles.role_name =?)
and
users.name like ?
and
specializations.id=user_specializations.specialization_id
and
users.id=user_specializations.user_id";
            $results2 = DB::select($qry2, array(
                0 => $specialization,
                1 => $type,
                2 => "%$doctor%",
            ));
            $total=count($results2);
            return response()->json(["data"=>$results,"count"=>$total]);
        }

    }

    public function getRoles()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    public function getUserTransports($id)
    {
        $users = DB::table('user_transports')->where('user_id','=',$id)
            ->join('transports', 'transports.id', '=', 'User_transports.transport_id')
            ->select('transports.id','transports.transport_type')
            ->get();
        return response()->json($users);
    }

    public function getallTransports()
    {
        $res = Transport::all();
        return response()->json($res);
    }


}

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
}

<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class checkDoctor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //get admin value of user from database

        $role = JWTAuth::parseToken()->getPayload()->get('role');
// then either of


        if ($role != 1) {
            return response()->json("No access");
        }
        return $next($request);
    }
}

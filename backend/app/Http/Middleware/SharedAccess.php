<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class SharedAccess
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
       $token = JWTAuth::parseToken()->getPayload()->get('id');
       if ($token){
           return $next($request);
       }
       else{
           return response()->json("No access");
       }

    }
}

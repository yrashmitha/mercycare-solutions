<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Headers: origin, x-requested-with, content-type');
//header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');


Route::get('get/specializations','SharedDataController@getSpecializations');
Route::get('get/roles','SharedDataController@getRoles');


Route::post('get/results/default','SharedDataController@searchDefault');





Route::post('patient/register', 'PatientAuthController@register');
Route::post('patient/login', 'PatientAuthController@login');
Route::post('patient/verify', 'PatientAuthController@otpVerify');
Route::get('patient/me','PatientAuthController@me')->middleware('auth:patients');
Route::get('app',"AppointmentController@index")->middleware(['shared']);
Route::post('app/create',"AppointmentController@create")->middleware(['shared']);
Route::get('app/getall/{id}',"AppointmentController@getAllPatientAppointments")->middleware(['shared']);
Route::get('app/complete/{id}',"AppointmentController@patientComplete")->middleware(['auth:patients']);

Route::post('app/d/complete/{id}',"AppointmentController@userComplete")->middleware(['auth:api']);







Route::get('app/getall/d/{id}',"AppointmentController@getAllUserAppointments")->middleware(['shared']);
Route::get('app/getappointment/{id}',"AppointmentController@getAppointmentData")->middleware(['shared']);

Route::get('app/gettransport/{id}',"SharedDataController@getUserTransports")->middleware('auth:api');
Route::post('app/approve/{id}',"AppointmentController@approveAppointment")->middleware('auth:api');
Route::get('app/starttracking/{id}',"AppointmentController@trackingStart")->middleware('auth:api');
Route::get('app/stoptracking/{id}',"AppointmentController@trackingStop")->middleware('auth:api');

Route::get('p/profile/{id}',"ProfileDataController@getPatientProfile")->middleware(['auth:patients']);
Route::get('p/avatar/{id}',"ProfileDataController@getPatientAvatarAndName")->middleware(['auth:patients']);

Route::get('d/profile/{id}',"ProfileDataController@getUserProfile")->middleware(['auth:api']);
Route::get('d/avatar/{id}',"ProfileDataController@getUserAvatarAndName")->middleware(['auth:api']);
Route::post('d/updateuserdata/',"ProfileDataController@updateUserData")->middleware(['auth:api']);


Route::post('p/changeavatar',"ProfileDataController@changeAvatar")->middleware('auth:patients');
Route::post('d/changeavatar',"ProfileDataController@changeUserAvatar")->middleware('auth:api');
Route::post('d/changepriceperkm',"ProfileDataController@changePricePerKm")->middleware('auth:api');
Route::get('d/deletetransport/{id}',"ProfileDataController@deleteTransportType")->middleware('auth:api');
Route::post('d/newtransport',"ProfileDataController@addnewTransport")->middleware('auth:api');
Route::post('d/specializationupdate',"ProfileDataController@updateSpecializations")->middleware('auth:api');


//Route::get('app',"AppointmentController@index")->middleware(["auth"]);
Route::post('member/register', 'MemberAuthController@register');
Route::get('member/getall', 'MemberDataController@getMyAllMembers');
Route::post('member/update/{id}', 'MemberDataController@updateMember');
//member/getall

Route::post('user/register', 'UserAuthController@register');
Route::post('user/login', 'UserAuthController@login');
Route::get('user/me', 'UserAuthController@me')->middleware('auth:api');
Route::get('fire','ProfileDataController@try');

Route::get("time","Controller@time");

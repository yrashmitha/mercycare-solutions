<?php

namespace App;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Appointment extends Model
{
    use Uuid;
    public $incrementing = false;
    protected $table = 'appointments';

    protected $fillable = [
        'appointment_status_id', 'user_fire_uid'
    ];

    public function createAppointment($patientId, $patientFireId, $userId, $patientGeoCoords, $extraMessage, $address)
    {
        $success = true;
        DB::beginTransaction();
        try {
            $appointment = new Appointment();
            $appointment->user_id = $userId;
            $appointment->patient_id = $patientId;
            $appointment->appointment_status_id = 1;
            $appointment->fire_patient_uid = $patientFireId;

//        saving appointmnet in appointment table
            $appointment->save();

//        insert data to appointment details table
            $appDetails = new AppointmentDetails();
            $appDetails->appointment_id = $appointment->id;
            $appDetails->patient_geo_cords_as_string = $patientGeoCoords;
            $appDetails->extra_message = $extraMessage;
            $appDetails->address = $address;
            $appDetails->transport_id = 5;
            $appDetails->save();
            DB::commit();

        } catch (\Exception $e) {

            DB::rollback();
            return response()->json($e->getMessage());
            $success = false;
        }
        if ($success) {
            return response()->json(['message' => 'Appointment placed.', "appointment" => $appointment], 200);
        } else {
            return response()->json(['message' => 'Something went wrong.'], 200);
        }
    }

    public function getAllPatientAppointments($patientId)
    {
//        $res=Appointment::where('patient_id',$patientId)->get();
        $res = DB::table('appointments')->where('patient_id', '=', $patientId)
            ->join('users', 'users.id', '=', 'appointments.user_id')
            ->join('appointment_statuses', 'appointment_statuses.id', '=', 'appointments.appointment_status_id')
            ->select('appointments.*', 'appointment_statuses.appointment_status', 'users.name')->orderByDesc('created_at')
            ->get();
        return response()->json($res);
    }

    public function approveAppointment($distance, $duration, $userGeoCoords, $appointmentId, $transportMethodId, $userFireUid)
    {
        $success = true;
        DB::beginTransaction();
        try {
//            insert data to appointment details table
            AppointmentDetails::where('appointment_id', $appointmentId)
                ->update([
                    'distance' => $distance,
                    'duration' => $duration,
                    'user_geo_cords_as_string' => $userGeoCoords,
                    'transport_id' => $transportMethodId,
                ]);

//            changing appointment status and inserting doctor firebase uid
            Appointment::where('id', $appointmentId)->update([
                'appointment_status_id' => 2,
                'fire_user_uid' => $userFireUid
            ]);//            changing doctor status to working
            ;
            User::where('id', Auth::guard('api')->user()->getAuthIdentifier())
                ->update([
                    'status_id' => 2
                ]);


        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json($e->getMessage());
            $success = false;
        }
        if ($success == true) {
            DB::commit();
            return response()->json(["status" => "Ok", "msg" => 'Approved appointment successfully']);
        } else {
            return response()->json(["msg" => 'Failed']);
        }

    }

    public function getAppointmentData($appointmentId)
    {
        $res = DB::table('appointments')->where('appointments.id', '=', $appointmentId)
            ->join('users', 'users.id', '=', 'appointments.user_id')
            ->join('appointment_details', 'appointment_details.appointment_id', '=', 'appointments.id')
            ->join('user_transports', 'user_transports.transport_id', '=', 'appointment_details.transport_id')
            ->join('appointment_statuses', 'appointment_statuses.id', '=', 'appointments.appointment_status_id')
            ->join('patients', 'patients.id', '=', 'appointments.patient_id')
            ->select('appointments.*',
                'appointment_statuses.appointment_status',
                'appointment_details.*',
                'user_transports.price_per_km',
                'patients.f_name', 'patients.l_name', 'patients.email', 'patients.mobile_num', 'patients.title', 'patients.mobile_num'
                , 'users.name', 'users.phone_num', 'users.email', 'users.price_per_hour'
            )
            ->get();
        return response()->json($res);

    }

    public function patientCompleteAppointment($appointmentId)
    {
        $success = true;
        DB::beginTransaction();
        try {
            $details = AppointmentDetails::where('appointment_id', '=', $appointmentId)->first();
//            return $details->user_completed;
            if ($details->user_completed == 1) {
//                updating appointment status in appointments table
                $app = Appointment::find($appointmentId);
//                return $app;
                $app->appointment_status_id = 4;
                $app->save();
//                updating patient completed  in appointment details table
                $details->patient_completed = 1;
                $details->save();

                $user = new User();
                $res = $user->checkAnotherOngoingAppointments($app->user_id);
                $d = User::find($app->user_id);
                if ($res > 0) {
                    $d->status_id = 2;
                    $d->save();
                }
                if ($res == 0) {
                    $d->status_id = 1;
                    $d->save();
                }


            } else {
                return response()->json(["msg" => "Your doctor still not completed appointment."]);
            }

        } catch (\Exception $e) {
            $success = false;
            DB::rollBack();
            return response()->json($e->getMessage());
        }
        if ($success == true) {
            DB::commit();
            return response()->json(["msg" => "Marked as completed.", "status" => 1]);
        } else {
            return response()->json(["msg" => "Some error occurred."]);

        }
    }

    public function userCompleteAppointment($appointmentId, $workingHours)
    {
        $success = true;
        DB::beginTransaction();
        try {
//            updating user completed
            $details = AppointmentDetails::where('appointment_id', '=', $appointmentId)->first();
            $details->user_completed = 1;

            $distance = $details->distance;
            $pricePerKm = $details->userTransport()->get()[0]->price_per_km;
            $pricePerHour = $details->appointment()->get()[0]->user()->get()[0]->price_per_hour;

//            calculating price
            $price = $this->calculatePrice($distance, $pricePerKm, $workingHours, $pricePerHour);
            $details->price = $price;
            $details->tracking_enabled = 0;
//            saving updated appointment details
            $details->save();
        } catch (\Exception $e) {
            $success = false;
            DB::rollBack();
            return response()->json($e->getMessage());
        }
        if ($success == true) {
            DB::commit();
            return response()->json(["msg" => "Marked as completed.", "status" => 1]);
        } else {
            return response()->json(["msg" => "Some error occurred."]);

        }
    }

    private function calculatePrice($distanceInKm, $pricePerKm, $workingHours, $pricePerHour)
    {
        $price = ($distanceInKm * $pricePerKm) + ($workingHours * $pricePerHour);
        return $price;
    }

    public function appointmentDetails()
    {
        return $this->hasOne("App\AppointmentDetails", 'appointment_id', 'id');
    }


    public function patient()
    {
        return $this->belongsTo("App\Patients", 'patient_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo("App\User", 'user_id', 'id');
    }


}

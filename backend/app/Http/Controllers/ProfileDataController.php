<?php

namespace App\Http\Controllers;

use App\PatientAvatar;
use App\Patients;
use App\User;
use App\UserAvatar;
use App\UserSpecialization;
use App\UserTransport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Kreait\Firebase\Factory;

class ProfileDataController extends Controller
{
    public function getPatientProfile($id)
    {
        $pro = new Patients();
        $res = $pro->getPatientProfile($id);
        return $res;
    }

    public function changeAvatar(Request $request)
    {
        $success = true;
        DB::beginTransaction();
        try {
            $user_id = $request->input('patient_id');
            $avatar = PatientAvatar::find($user_id);

            if ($avatar) {
                $deletePath = 'public/' . $avatar->path;
                Storage::delete($deletePath);
                PatientAvatar::where('patient_id', $user_id)->delete();
                if ($request->files->count() > 0) {
                    $avatar = new PatientAvatar();

                    $avatar->patient_id = $user_id;
//                $extension = $request->file('avatar')->extension();


                    $path = $request->file('file')->store('public/patient-avatars');

                    $realPath = explode('/', $path, 2)[1];
                    $avatar->path = $realPath;
                    $avatar->save();
                    DB::commit();
                    return response()->json(["avatar" => $avatar, 'message' => 'previous image delete.Image uploaded']);


                } else {
                    return response('no images found image');
                }
            } else {
                if ($request->files->count() > 0) {
                    $avatar = new PatientAvatar();

                    $avatar->patient_id = $user_id;
//                $extension = $request->file('avatar')->extension();


                    $path = $request->file('file')->store('public/patient-avatars');


                    $realPath = explode('/', $path, 2)[1];
                    $avatar->path = $realPath;
                    $avatar->save();
                    DB::commit();
                    return response()->json(["avatar" => $avatar, 'message' => 'No previous images to delete.Image uploaded']);
                } else {
                    return response('no images no previous image');
                }
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json($e->getMessage());
        }


    }

    public function changeUserAvatar(Request $request)
    {
        $success = true;
        DB::beginTransaction();
        try {
            $user_id = $request->input('user_id');
            $avatar = UserAvatar::find($user_id);

            if ($avatar) {
                $deletePath = 'public/' . $avatar->path;
                Storage::delete($deletePath);
                UserAvatar::where('user_id', $user_id)->delete();
                if ($request->files->count() > 0) {
                    $avatar = new UserAvatar();

                    $avatar->user_id = $user_id;
//                $extension = $request->file('avatar')->extension();


                    $path = $request->file('file')->store('public/user-avatars');

                    $realPath = explode('/', $path, 2)[1];
                    $avatar->path = $realPath;
                    $avatar->save();
                    DB::commit();
                    return response()->json(["avatar" => $avatar, 'message' => 'previous image delete.Image uploaded']);


                } else {
                    return response('no images found image');
                }
            } else {
                if ($request->files->count() > 0) {
                    $avatar = new UserAvatar();

                    $avatar->user_id = $user_id;
//                $extension = $request->file('avatar')->extension();


                    $path = $request->file('file')->store('public/patient-avatars');


                    $realPath = explode('/', $path, 2)[1];
                    $avatar->path = $realPath;
                    $avatar->save();
                    DB::commit();
                    return response()->json(["avatar" => $avatar, 'message' => 'No previous images to delete.Image uploaded']);
                } else {
                    return response('no images no previous image');
                }
            }

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json($e->getMessage());
        }
    }

    public function getUserProfile($id)
    {
        $pro = new User();
        $res = $pro->getUserProfile($id);
        return $res;
    }

    public function changePricePerKm(Request $request)
    {
        $price = $request->price;
        $transport_id = $request->transport_id;

        $ob = new UserTransport();
        $res = $ob->changePricePerKm($transport_id, $price);
        return $res;
    }

    public function deleteTransportType($id)
    {
        $ob = new UserTransport();
        $res = $ob->deleteTransportType($id);
        return $res;
    }

    public function addnewTransport(Request $request)
    {
//        return $request;
        $price = $request->price;
        $transport_id = $request->transport_id;

        $res = UserTransport::addNewTransport($transport_id, $price);
        return $res;
    }

    public function updateSpecializations(Request $request)
    {
        $arr = $request->specialization_id;
        $obj = new UserSpecialization();
        $res = $obj->updateSpecialization($arr);
        return $res;

    }

    public function getPatientAvatarAndName($id)
    {
        $ob = new PatientAvatar();
        return $ob->getPatientAvatarAndName($id);

    }

    public function getUserAvatarAndName($id)
    {
        $ob = new UserAvatar();
        return $ob->getUserAvatarAndName($id);

    }

    public function updateUserData(Request $request)
    {
//        return $request;
        $name = $request->name;
        $status_id = $request->status_id;
        $pricePerHour = $request->price_per_hour;
        $app = new User();
        return $app->updateUserData($name, $pricePerHour, $status_id);

    }

    /**
     *
     */
    public function try()
    {


        $factory = (new Factory)->withServiceAccount('{
  "type": "service_account",
  "project_id": "mercycare17",
  "private_key_id": "c7b68d7a8309d7c422e59558bc001d460d5c9edc",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDL4PCeBIEfDZQ9\nHWR2r/dU5wA1Zv493Mv5Y0simWSmBqiax0XNsFxS07ukNArFKRYKNlTYxONdo8KF\nJATSf7du0MRJZyP6XHzJgET363xS6zOoEdqOvQG1AihBxA4HlFwpd7C6KEqjWq2j\niH3eJEKNE20XR0syy1aSF279CAGFxVDlarAqMu8mze8olN81qQuMF9IVvTaBvuiu\nM9ZGyCCHEHPyN3fzDTk1JrwnFCpOaK6OSUuz7lY6+0vlIwXVzeIs6N8nJTHqVvTD\ndlp0PWTCFkNevwCY77IYELddMmUB/n3bxGiP/pbirZ2s6fKT+iNb6J+5IV3u0b4E\ngBgJD/XBAgMBAAECggEAFf1GZnys4okH5omPht+WyRD7LEdV/50bYOQNPAeYW/HW\n6I66oCM36fUNRXoZeUdjqalPgGvH7BcYCV0nqf59bdXVfedCcaPdD6ymg6jh6V2V\n3jhCvudy0i+P4PwA2V9ui0huBr4GwtSqartze+ykQuwH9Z1KZomY5jvhzCe7Zk5/\nEQl10UvD89YqDHaeY9kC+r7sOBPcL5ZEIM+t947P+nsnLZr0yyBE4GUEk/xYP+mJ\nputxVjgBtvGX82IBHShpNbv4F7t41tOyYMXIgmIGz+jpH01Pg+F2FMoC4LCfh+mN\ngBL0ws0aZjcxgo7ZRFvp6OMZAuymHM3Yz32dugPh2wKBgQDmpZ111/k/DAdZ4MYX\nu8+YU6wpcbFNunzW+jsC9tZ1iVaIQnwXeprBPuO15zbUhJy7GmrHONbagp1Y5G89\nt/wvoxS5t5hHaaBPiEfMleSqc66b82Jbc638TwFHaT6XiKUQJmkqd3PnOY6FbMnl\nYEw1eB56tyzgFe87bIbx8WpAcwKBgQDiShF3SIQkH0MsgAKu+fPbyaeCNuv5dUz7\nFSrUwJrkARJSFKn1ylA+UQ/L4rebR4gh3cOr4Qxd+D4eSG6ES1MtlJjGUpMSATXL\nxGb8+fFSM+dxz3x8ihFOs+Na6/LH0qhP+DuTpjWkL7f6CVDcPz6EFshtjK20PzMI\n1oEsC5nn+wKBgHltgbuT68XUiF46JzBBkWaJzp63G3hnkOgBL2Y9G+UfW+46ymf2\nBVltyaZvxv8VngonO0YNV5gModg105bzsRJHUlcAIGygYGTew6Yi2BMg+jFibkrl\nWRj3Yx38e5Z9uyEIh99yqhN2yuDVyGk5TIXt6mYC395NzfhEB7uCtMSfAoGAIm2o\neKCE0kYbX0LepaaLzo3AuZQHlP2ex7ixuorPRg9PrUNNlILCcKi+oYON8ccRVC28\nXoMv8YAaW1sjzWb0ccPg9pOLorqiZ60rCiQw7hPNi8hIpV4QQgwmdCff2T0YtIoM\n7mrkUGWeNSGDtu68YTZiKiC0MO9IoXiZUI03Tk8CgYBtZEnA3qwt/dBsZjY/Xmbr\nu2l+rLM57iYnrw3u6DpbqpBLVlzIsqzv56wwmLLbbOh9Yr3vdu3Hy6XmgvF87iio\n1RA7zH/EcO8ff+fHskwkLQ0SzVDgSLq7Vkf93hB56tUDSxlXxzF8IbhwlOuG5ek7\nUlJNmtsaaDnazsEqj5sVMA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-mdnuf@mercycare17.iam.gserviceaccount.com",
  "client_id": "110674094327315679597",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mdnuf%40mercycare17.iam.gserviceaccount.com"
}');
        $userProperties = [
            'uid' => 'fuckoffuid',
            'email' => 'user@example.com',
            'emailVerified' => false,
            'phoneNumber' => '+94776891125',
            'password' => 'secretPassword',
            'displayName' => 'John Doe',
            'photoUrl' => 'http://www.example.com/12345678/photo.png',
            'disabled' => false,
        ];

        $auth = $factory->createAuth();
//        $createdUser = $auth->createUser($userProperties);
//        $signInResult = $auth->signInWithEmailAndPassword('user@example.com', 'secretPassword');
        $user = $auth->getUser('fuckoffuid');

        return response()->json($user);

    }



    public function time()
    {
        return "hi";
        return Carbon::now();
    }
}

import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
import {Doctor} from "./doctor";
import {UserTransports} from "./user-transports";
import {Specialization} from "./specialization";
import {Transport} from "./transport";

@Serialize({})
export class UserProfile extends Serializable {
  @SerializeProperty({
    type: Doctor,
    map:'user'
  })
  private _user:Doctor;

  @SerializeProperty({
    type: UserTransports,
    map:'transportDetails',
    list:true
  })
  private _transportTypes:UserTransports[];

  @SerializeProperty({
    type: Specialization,
    map:'specializationDetails',
    list:true
  })
  private _userSpecializations:Specialization[];

  @SerializeProperty({
    type: Transport,
    map:'allTransportTypes',
    list:true
  })
  private _allTransportTypes:Transport[];


  get allTransportTypes(): Transport[] {
    return this._allTransportTypes;
  }

  set allTransportTypes(value: Transport[]) {
    this._allTransportTypes = value;
  }

  get user(): Doctor {
    return this._user;
  }

  set user(value: Doctor) {
    this._user = value;
  }

  get transportTypes(): UserTransports[] {
    return this._transportTypes;
  }

  set transportTypes(value: UserTransports[]) {
    this._transportTypes = value;
  }

  get userSpecializations(): Specialization[] {
    return this._userSpecializations;
  }

  set userSpecializations(value: Specialization[]) {
    this._userSpecializations = value;
  }
}

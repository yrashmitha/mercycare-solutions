import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})
export class AppointmentDetails extends Serializable{
  @SerializeProperty({
    map:'name'
  })
  private _UserName:string;

  @SerializeProperty({
    map:'f_name'
  })
  private _patientName:string;

  @SerializeProperty({
    map:'appointment_status'
  })
  private _appointmentStatusName:string;

  @SerializeProperty({
    map:'transport_id'
  })
  private _transportId:number;

  @SerializeProperty({
    map:'transport_method'
  })
  private _transportMethod:string;

  @SerializeProperty({
    map:'address'
  })
  private _address:string;

  @SerializeProperty({
    map:'distance'
  })
  private _distance:number;

  @SerializeProperty({
    map:'price'
  })
  private _price:number;

  @SerializeProperty({
    map:'extra_message'
  })
  private _extraMessage:string;

  @SerializeProperty({
    map:'patient_geo_cords_as_string'
  })
  private _patientGeoCoords:string;

  @SerializeProperty({
    map:'user_geo_cords_as_string'
  })
  private _userGeoCoords:string;
}

import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
@Serialize({})
export class Appointment extends Serializable{

  @SerializeProperty({
    map:'id'
  })
  private _appointmentId:string;

  @SerializeProperty({
    map:'user_id'
  })
  private _userId:string;

  @SerializeProperty({
    map:'name'
  })
  private _UserName:string;

  @SerializeProperty({
    map:'patient_id'
  })
  private _patientId:string;

  @SerializeProperty({
    map:'f_name'
  })
  private _patienFirstName:string;

  @SerializeProperty({
    map:'l_name'
  })
  private _patientLastName:string;

  @SerializeProperty({
    map:'mobile_num'
  })
  private _patientMobileNumber:string;



  @SerializeProperty({
    map:'phone_num'
  })
  private _doctorMobileNumber:string;

  @SerializeProperty({
    map:'appointment_status_id'
  })
  private _appointmentStatusId:number;

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
    map:'price_per_hour'
  })
  private _pricePerHour:number;

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

  @SerializeProperty({
    map:'fire_user_uid'
  })
  private _fireUserUid:string;

  @SerializeProperty({
    map:'fire_patient_uid'
  })
  private _firePatientUid:string;

  @SerializeProperty({
    map:'title'
  })
  private _patientTitle:string;

  @SerializeProperty({
    map:'duration'
  })
  private _duration:string;

  @SerializeProperty({
    map:'created_at'
  })
  private _createdAt:string;

  @SerializeProperty({
    map:'tracking_enabled'
  })
  private _trackingEnabled:boolean;

  @SerializeProperty({
    map:'patient_completed'
  })
  private _patientCompeted:boolean;

  @SerializeProperty({
    map:'price_per_km'
  })
  private _pricePerKm:number;

  @SerializeProperty({
    map:'user_completed'
  })
  private _userCompleted:number;


  get duration(): string {
    return this._duration;
  }



  get patientCompeted(): boolean {
    return this._patientCompeted;
  }

  set patientCompeted(value: boolean) {
    this._patientCompeted = value;
  }


  get pricePerKm(): number {
    return this._pricePerKm;
  }

  set pricePerKm(value: number) {
    this._pricePerKm = value;
  }

  get userCompleted(): number {
    return this._userCompleted;
  }

  set userCompleted(value: number) {
    this._userCompleted = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }


  get pricePerHour(): number {
    return this._pricePerHour;
  }

  set pricePerHour(value: number) {
    this._pricePerHour = value;
  }

  set duration(value: string) {
    this._duration = value;
  }


  get trackingEnabled(): boolean {
    return this._trackingEnabled;
  }

  set trackingEnabled(value: boolean) {
    this._trackingEnabled = value;
  }

  get patientTitle(): string {
    return this._patientTitle;
  }

  set patientTitle(value: string) {
    this._patientTitle = value;
  }

  get patientMobileNumber(): string {
    return this._patientMobileNumber;
  }

  set patientMobileNumber(value: string) {
    this._patientMobileNumber = value;
  }

  get doctorMobileNumber(): string {
    return this._doctorMobileNumber;
  }

  set doctorMobileNumber(value: string) {
    this._doctorMobileNumber = value;
  }

  get appointmentId(): string {
    return this._appointmentId;
  }

  set appointmentId(value: string) {
    this._appointmentId = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get UserName(): string {
    return this._UserName;
  }




  set UserName(value: string) {
    this._UserName = value;
  }

  get patientId(): string {
    return this._patientId;
  }

  set patientId(value: string) {
    this._patientId = value;
  }


  get patienFirstName(): string {
    return this._patienFirstName;
  }

  set patienFirstName(value: string) {
    this._patienFirstName = value;
  }

  get patientLastName(): string {
    return this._patientLastName;
  }

  set patientLastName(value: string) {
    this._patientLastName = value;
  }

  get appointmentStatusId(): number {
    return this._appointmentStatusId;
  }


  get fireUserUid(): string {
    return this._fireUserUid;
  }

  set fireUserUid(value: string) {
    this._fireUserUid = value;
  }

  get firePatientUid(): string {
    return this._firePatientUid;
  }

  set firePatientUid(value: string) {
    this._firePatientUid = value;
  }

  set appointmentStatusId(value: number) {
    this._appointmentStatusId = value;
  }

  get appointmentStatusName(): string {
    return this._appointmentStatusName;
  }

  set appointmentStatusName(value: string) {
    this._appointmentStatusName = value;
  }

  get transportId(): number {
    return this._transportId;
  }

  set transportId(value: number) {
    this._transportId = value;
  }

  get transportMethod(): string {
    return this._transportMethod;
  }

  set transportMethod(value: string) {
    this._transportMethod = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get distance(): number {
    return this._distance;
  }

  set distance(value: number) {
    this._distance = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get extraMessage(): string {
    return this._extraMessage;
  }

  set extraMessage(value: string) {
    this._extraMessage = value;
  }

  get patientGeoCoords(): string {
    return this._patientGeoCoords;
  }

  set patientGeoCoords(value: string) {
    this._patientGeoCoords = value;
  }

  get userGeoCoords(): string {
    return this._userGeoCoords;
  }

  set userGeoCoords(value: string) {
    this._userGeoCoords = value;
  }
}

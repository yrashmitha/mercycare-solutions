import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})
export class Doctor extends Serializable{
  @SerializeProperty({
    map:'id'
  }) private _id:number;
  @SerializeProperty({
    map:'email'
  }) private _email:string;

  @SerializeProperty({
    map:'user_name'
  }) private _userName:string;

  @SerializeProperty({
    map:'address'
  }) private _address:string;

  @SerializeProperty({
    map:'phone_num'
  }) private _phoneNumber:string;

  @SerializeProperty({
    map:'status_id'
  }) private _statusId:number;

  @SerializeProperty({
    map:'status_name'
  }) private _Status:string;

  @SerializeProperty({
    map:'role_id'
  }) private _roleId:number;

  @SerializeProperty({
    map:'role_name'
  }) private _role:string;

  @SerializeProperty({
    map:'name'
  }) private _name:string;

  @SerializeProperty({
    map:'path'
  }) private _avatarPath:string;

  @SerializeProperty({
    map:'price_per_hour'
  }) private _pricePerHour:number;


  get pricePerHour(): number {
    return this._pricePerHour;
  }

  set pricePerHour(value: number) {
    this._pricePerHour = value;
  }

  get id(): number {
    return this._id;
  }

  get avatarPath(): string {
    return this._avatarPath;
  }

  set avatarPath(value: string) {
    this._avatarPath = value;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get statusId(): number {
    return this._statusId;
  }

  set statusId(value: number) {
    this._statusId = value;
  }

  get Status(): string {
    return this._Status;
  }

  set Status(value: string) {
    this._Status = value;
  }

  get roleId(): number {
    return this._roleId;
  }

  set roleId(value: number) {
    this._roleId = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}

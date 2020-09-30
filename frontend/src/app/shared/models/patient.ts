import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})
export class Patient extends Serializable{
  @SerializeProperty({
    map:'id'
  })
  private _id:number;
  @SerializeProperty({
    map:'f_name'
  }) private _firstName:string;

  @SerializeProperty({
    map:'l_name'
  }) private _lastName:string;

  @SerializeProperty({
    map:'mobile_num'
  }) private _mobileNumber:number;

  @SerializeProperty({
    map:'nic'
  }) private _nic:string;

  @SerializeProperty({
    map:'title'
  }) private _title:string;

  @SerializeProperty({
    map:'address'
  }) private _address:string;

  @SerializeProperty({
    map:'path'
  }) private _path:string;

  @SerializeProperty({
    map:'active'
  }) private _active:boolean;


  @SerializeProperty({
    map:'role'
  }) private _roleId:number;

  @SerializeProperty({
    map:'email'
  }) private _email:string;
  @SerializeProperty({
    map:'password'
  }) private _password:string;

  @SerializeProperty({
    map:'geo_cords'
  }) private _geoCoords:string;


  get geoCoords(): string {
    return this._geoCoords;
  }

  set geoCoords(value: string) {
    this._geoCoords = value;
  }

  get id(): number {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get mobileNumber(): number {
    return this._mobileNumber;
  }

  get nic(): string {
    return this._nic;
  }

  get title(): string {
    return this._title;
  }

  get address(): string {
    return this._address;
  }

  get path(): string {
    return this._path;
  }

  get active(): boolean {
    return this._active;
  }

  get roleId(): number {
    return this._roleId;
  }

  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }


  set id(value: number) {
    this._id = value;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  set mobileNumber(value: number) {
    this._mobileNumber = value;
  }

  set nic(value: string) {
    this._nic = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set address(value: string) {
    this._address = value;
  }

  set path(value: string) {
    this._path = value;
  }

  set active(value: boolean) {
    this._active = value;
  }

  set roleId(value: number) {
    this._roleId = value;
  }

  set email(value: string) {
    this._email = value;
  }
  set password(value: string) {
    this._password = value;
  }
}

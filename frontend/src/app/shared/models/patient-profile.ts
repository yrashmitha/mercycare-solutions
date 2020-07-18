import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})

export class PatientProfile extends Serializable{
  @SerializeProperty({
    map:'address'
  })
  private _address:string;

  @SerializeProperty({
    map:'email'
  })
  private _email:string;

  @SerializeProperty({
    map:'mobile_num'
  })
  private _mobileNumber:string;

  @SerializeProperty({
    map:'f_name'
  })
  private _firstName:string;

  @SerializeProperty({
    map:'l_name'
  })
  private _lastName:string;

  @SerializeProperty({
    map:'title'
  })
  private _title:string;

  @SerializeProperty({
    map:'path'
  })
  private _avatarPath:string;

  @SerializeProperty({
    map:'geo_cords'
  }) private _geoCoords:string;


  get geoCoords(): string {
    return this._geoCoords;
  }

  set geoCoords(value: string) {
    this._geoCoords = value;
  }
  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get mobileNumber(): string {
    return this._mobileNumber;
  }

  set mobileNumber(value: string) {
    this._mobileNumber = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get avatarPath(): string {
    return this._avatarPath;
  }

  set avatarPath(value: string) {
    this._avatarPath = value;
  }
}

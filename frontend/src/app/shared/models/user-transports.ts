import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
@Serialize({})
export class UserTransports {

  @SerializeProperty({
    map:'id'
  })
  private _id:number;

  @SerializeProperty({
    map:'transport_type'
  })
  private _type:string;

  @SerializeProperty({
    map:'price_per_km'
  })
  private _pricePerKm:number;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get pricePerKm(): number {
    return this._pricePerKm;
  }

  set pricePerKm(value: number) {
    this._pricePerKm = value;
  }
}

import {Serializable, Serialize, SerializeProperty} from "ts-serializer";
@Serialize({})
export class Transport extends Serializable{

  @SerializeProperty({
    map:'id'
  })
  private _id:number;

  @SerializeProperty({
    map:'transport_type'
  })
  private _type:string;


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
}

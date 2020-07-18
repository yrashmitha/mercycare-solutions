import {Serialize, SerializeProperty,Serializable} from "ts-serializer";

@Serialize({})
export class Specialization extends Serializable{
  @SerializeProperty({
    map:'id'
  })
  private _id:number;

  @SerializeProperty({
    map:'specialization_name'
  })
  private _specializationName:string;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get specializationName(): string {
    return this._specializationName;
  }

  set specializationName(value: string) {
    this._specializationName = value;
  }
}

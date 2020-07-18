import {Serializable, Serialize, SerializeProperty} from "ts-serializer";

@Serialize({})
export class Role extends Serializable{
  @SerializeProperty({
    map:'_id'
  }) private _id:number;
  @SerializeProperty({
    map:'role_name'
  }) private _roleName:string;


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get roleName(): string {
    return this._roleName;
  }

  set roleName(value: string) {
    this._roleName = value;
  }
}

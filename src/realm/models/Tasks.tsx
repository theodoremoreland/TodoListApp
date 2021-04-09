import { ObjectId } from "bson";

export class Task {
  _id: number;
  name: string;
  dueDate: Date;
  status: string;

  constructor(_id: number, name : string, dueDate : Date, status : string) {
    this.name = name
    this.dueDate = dueDate
    this.status = status
    this._id = _id;
  };

  static STATUS_OPEN = "open";
  static STATUS_COMPLETE = "complete";

  static schema = {
      name: "Task",
      properties: {
        _id: "int",
        name: "string",
        dueDate: "date",
        status: "string"
      },
      primaryKey: '_id',
  };
};
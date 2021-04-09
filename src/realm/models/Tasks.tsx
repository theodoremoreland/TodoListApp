import { ObjectId } from "bson";

export class Task implements ITask {
  _id: ObjectId;
  name: string;
  note: string;
  dueDate: Date;
  status: string;

  constructor(name : string, note : string, dueDate : Date, status : string) {
    this.name = name;
    this.note = note;
    this.dueDate = dueDate;
    this.status = status;
    this._id = new ObjectId();
  };

  static STATUS_OVERDUE = "overdue";
  static STATUS_INCOMPLETE = "incomplete";
  static STATUS_COMPLETE = "complete";

  static schema = {
      name: "Task",
      properties: {
        _id: "objectId",
        name: "string",
        note: "string",
        dueDate: "date",
        status: "string"
      },
      primaryKey: '_id',
  };
};
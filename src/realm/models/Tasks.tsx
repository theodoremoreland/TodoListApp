export class Task implements ITask {
  id: number;
  name: string;
  note: string;
  dueDate: Date;
  status: 'open' | 'overdue' | 'complete';

  constructor(id: number, name : string, note : string, dueDate : Date, status : string) {
    this.name = name;
    this.note = note;
    this.dueDate = dueDate;
    this.status = status === 'overdue' ? status
      : status === 'complete' ? status
      : 'open';
    this.id = id;
  };

  static schema = {
      name: "Task",
      properties: {
        id: "int",
        name: "string",
        note: "string",
        dueDate: "date",
        status: "string"
      },
      primaryKey: 'id',
  };
};
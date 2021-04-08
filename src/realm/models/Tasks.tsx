export class Task {
    static schema: {
        name: "Task",
        properties: {
          _id: "int",
          name: "string",
          dueDate: "date",
          status: "string"
        },
        primaryKey: '_id',
    };
}

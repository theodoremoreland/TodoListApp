interface ITask {
    _id?: any,
    name: string,
    note: string,
    dueDate: Date,
    status: string
}

type ITaskList = Object[];

interface ITasksContext {
    tasks: ITaskList,
    addTask: (task: ITask) => void,
    removeTask: (task: ITask) => void,
    updateTask: (task: ITask) => void
}
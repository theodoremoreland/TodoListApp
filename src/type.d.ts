interface ITask {
    _id: number,
    name: string,
    note?: string,
    dueDate: Date,
    status: string
}

type ITaskList = Array<ITask> | [];

interface ITasksContext {
    tasks: ITaskList,
    addTask: (task: ITask) => void,
    removeTask: (task: ITask) => void,
    updateTask: (task: ITask) => void
}
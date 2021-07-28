interface ITask {
    id: number,
    name: string,
    note: string,
    dueDate: Date,
    status: 'complete' | 'open' | 'overdue'
}

// TODO change this, maybe?
type ITaskList = any[];

interface ITasksContext {
    tasks: ITaskList,
    addTask: (task: ITask) => void,
    removeTask: (task: ITask) => void,
    updateTask: (task: ITask) => void
}
export const filterTasks = (tasks : ITaskList, listType : string) : ITaskList => {
    const filteredTasks = tasks.filter((task : ITask) => {
        switch(listType) {
            case "all":
                return true;
            case "open":
                return task.status === "open" || task.status === "overdue";
            default:
                return task.status === listType;
        }
    });

    return filteredTasks;
};
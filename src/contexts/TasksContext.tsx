// React
import 'react-native-gesture-handler';
import React, { FC, ReactElement, ReactNode, useState } from 'react';

export const TasksContext = React.createContext<ITasksContext | {}>({});

const TasksProvider: FC<ReactNode> = ({children}) : ReactElement => {
    const [tasks, setTasks] = useState<ITaskList>([]);
    
    const addTask = (task : ITask) : void => {
        setTasks([...tasks, task]);
    };

    const removeTask = (task : ITask) : void => {
        const updatedTaskList : ITaskList = tasks.filter((e) => e._id !== task._id);
        setTasks(updatedTaskList);
    };

    const updateTask = (task : ITask) : void => {
        const filteredTaskList : ITaskList = tasks.filter((e) => e._id !== task._id);
        const updatedTaskList = [...filteredTaskList, task].sort((a, b) => a._id - b._id);
        setTasks(updatedTaskList);
    };

    return (
        <TasksContext.Provider value={{tasks, addTask, removeTask, updateTask}}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
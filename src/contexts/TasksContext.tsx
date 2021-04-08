// React
import 'react-native-gesture-handler';
import React, { FC, ReactElement, ReactNode, useState } from 'react';

// Realm
import Realm, { Results } from "realm";
import { Task } from '../realm/models/Tasks';

export const TasksContext = React.createContext<ITasksContext | {}>({});

const realm = new Realm({
    path: "../realm",
    schema: [Task],
  });

const TasksProvider: FC<ReactNode> = ({children}) : ReactElement => {
    const [tasks, setTasks] = useState<Results<Object>>(realm.objects("Task"););
    
    const addTask = (task) : void => {
        let newTask;
        realm.write(() => {
            // Assign a newly-created instance to the variable.
            newTask = realm.create("Task", task);
          });
    };

    const removeTask = (task) : void => {
        const myTask = realm.objectForPrimaryKey("Task", task._id);
        realm.delete(myTask);
    };

    const updateTask = (task) : void => {
        const t = realm.create(task,"Task", "modified");
    };

    return (
        <TasksContext.Provider value={{tasks, addTask, removeTask, updateTask}}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
// React
import 'react-native-gesture-handler';
import React, { FC, ReactElement, ReactNode, useState, useRef, useEffect } from 'react';

// Realm
import Realm, { Results } from "realm";
import { Task } from '../realm/models/Tasks';

export const TasksContext = React.createContext<ITasksContext | null>(null);

const TasksProvider: FC<ReactNode> = ({children}) : ReactElement => {
    const [tasks, setTasks] = useState<ITaskList>([]);

    // Use a Ref to store the realm rather than the state because it is not
    // directly rendered, so updating it should not trigger a re-render as using
    // state would.
    const realmRef = useRef<any>(null);
    
    const addTask = (task : ITask) : void => {
        console.log(`adding.... ${JSON.stringify(task)}`);

        const realm = realmRef.current;

        realm.write(() => {
            realm.create("Task", new Task(task.name, task.note, task.dueDate, task.status));
            const q : Results<Object> = realm.objects("Task").sorted("dueDate");
            setTasks([...realm.objects("Task").sorted("dueDate")]);
        });
    };

    const removeTask = (task : ITask) : void => {
        console.log(`removing.... ${JSON.stringify(task)}`);
        // console.log(`oid: ${task._id[1]}`);
        const realm = realmRef.current;
        const myTask : Results<Object> = realm.objectForPrimaryKey("Task", task._id[1]);

        realm.write(() => {
            realm.delete("Task", task);
            const q : Results<Object> = realm.objects("Task").sorted("dueDate");
            setTasks([...q]);
        });
    };

    const updateTask = (task : ITask) : void => {
        console.log(`updating.... ${JSON.stringify(task)}`);

        const realm = realmRef.current;

        realm.write(() => {
            realm.create("Task", task, "modified");
            const q : Results<Object> = realm.objects("Task").sorted("dueDate");
            setTasks([...q]);
        });
    };

    useEffect(() => {
        const realmConfig = {
            path: "TodoListApp.TasksBeta",
            schema: [Task.schema],
            deleteRealmIfMigrationNeeded: true
        };

        Realm.open(realmConfig).then((realm) => {
            realmRef.current = realm;
            const tasks : Results<Object> = realm.objects("Task");
            let sortedTasks : Results<Object> = tasks.sorted("dueDate");

            setTasks([...sortedTasks]);

            sortedTasks.addListener(() => {
                setTasks([...sortedTasks]);
            });
        }).catch(e => {throw new Error(e)});

        return () => {
            const realm = realmRef.current;

            if (realm) {
                realm.close();
                realm.current = null;
                setTasks([]);
            };
        };
    }, []);

    return (
        <TasksContext.Provider value={{tasks, addTask, removeTask, updateTask}}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
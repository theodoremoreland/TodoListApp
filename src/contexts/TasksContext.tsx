// React
import 'react-native-gesture-handler';
import React, { FC, ReactElement, ReactNode, useState, useRef, useEffect } from 'react';

// Realm
import Realm, { Results } from "realm";
import { Task } from '../realm/models/Tasks';

export const TasksContext = React.createContext<any>(null);

const TasksProvider: FC<ReactNode> = ({children}) : ReactElement => {
    const [tasks, setTasks] = useState<any>([]);

    // Use a Ref to store the realm rather than the state because it is not
    // directly rendered, so updating it should not trigger a re-render as using
    // state would.
    const realmRef = useRef<any>(null);
    
    const addTask = (task: any) : void => {
        console.log(task);
        const realm = realmRef.current;
        realm.write(() => {
            realm.create("Task", new Task(task._id, task.name, task.dueDate, task.status));
            setTasks([...realm.objects("Task").sorted("dueDate")]);
        });
    };

    const removeTask = (task : any) : void => {
        console.log("removing....");
        console.log(task);
        const realm = realmRef.current;
        const myTask = realm.objectForPrimaryKey("Task", task._id);
        realm.write(() => {
            realm.delete("Task", myTask);
            setTasks([...realm.objects("Task").sorted("dueDate")]);
        });
    };

    const updateTask = (task) : void => {
        console.log("updating....");
        console.log(task);
        const realm = realmRef.current;
        realm.write(() => {
            realm.create("Task", new Task(task._id, task.name, task.dueDate, task.status), "modified");
            setTasks([...realm.objects("Task").sorted("dueDate")]);
        });
    };

    useEffect(() => {
        Realm.open({path: "TodoListApp.Tasks", schema: [Task.schema], deleteRealmIfMigrationNeeded: true}).then((r) => {
            realmRef.current = r;
            const tasks = r.objects("Task");
            let sorted = tasks.sorted("dueDate");

            setTasks([...sorted]);

            sorted.addListener(() => {
                setTasks([...sorted]);
            });

        }).catch(e => {throw new Error(e)});

        return () => {
            const r = realmRef.current;

            if (r) {
                r.close();
                r.current = null;
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
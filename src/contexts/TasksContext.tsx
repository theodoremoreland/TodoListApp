// React
import 'react-native-gesture-handler';
import React, { FC, ReactElement, ReactNode, useState, useRef, useEffect } from 'react';

// Realm
import Realm, { Results } from "realm";
import { Task } from '../realm/models/Tasks';

// Push notifications
import { scheduleNotification, cancelNotification } from '../Notifications';

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
            const maxID : number | undefined = realm.objects("Task").sorted("id", true)[0]?.id;
            const newID : number = typeof maxID === "number" ? (maxID + 1) : 1;

            // Creates require class instance and will not work with object literals.
            realm.create("Task", new Task(newID, task.name, task.note, task.dueDate, task.status));
            const q : Results<Object> = realm.objects("Task").sorted("dueDate");
            setTasks([...q]);
        });

        // TODO make this async
        scheduleNotification(task.dueDate, task.id, task.name);
    };

    const removeTask = (task : ITask) : void => {
        console.log(`removing.... ${JSON.stringify(task)}`);

        const realm = realmRef.current;

        realm.write(() => {
            realm.delete(task);
            const q : Results<Object> = realm.objects("Task").sorted("dueDate");
            setTasks([...q]);
        });

        // TODO make this async
        cancelNotification(task.id);
    };

    const updateTask = (task : ITask) : void => {
        console.log(`updating.... ${JSON.stringify(task)}`);

        const realm = realmRef.current;

        realm.write(() => {
            // Updates (and creates, in general) require class instance and will not work with object literals.
            realm.create("Task", new Task(task.id, task.name, task.note, task.dueDate, task.status), "modified");
            const q : Results<Object> = realm.objects("Task").sorted("dueDate");
            setTasks([...q]);
        });

        // TODO make this async
        if (task.status === "complete") {
            cancelNotification(task.id);
        };
    };

    useEffect(() => {
        const realmConfig = {
            path: "TodoListAppAlpha.Tasks",
            schema: [Task.schema],
            deleteRealmIfMigrationNeeded: true
        };

        Realm.open(realmConfig).then((realm) => {
            console.log(realm.path);
            
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
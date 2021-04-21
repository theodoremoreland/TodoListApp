// React
import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import {
    FlatList
} from 'react-native';

// Context
import { TasksContext } from '../contexts/TasksContext';

// Custom components
import TaskItem from './TaskItem';

// Styles
import { styles } from '../styles/taskList';

interface IProps {
    listType: "all" | "open" | "complete" | "overdue"
};

const TaskList: FC<IProps> = ({listType}) : ReactElement => {
    const { tasks } = useContext(TasksContext) as ITasksContext;
    const [filteredTasks, setFilteredTask] = useState<Array<ITask>>([]);

    useEffect(() => {
        // Setting filteredTasks here to ensure filtering on all tasks
        // (i.e. doing so in declaration leads to empty lists in some cases)
        const filteredTasks = tasks.filter((task : ITask) => {
            if (listType === "all") {
                return true;
            }
            else if (listType === "open") {
                return task.status === "open" || task.status === "overdue";
            }
            else {
                return task.status === listType;
            };
        });
        setFilteredTask(filteredTasks);
    }, [tasks, listType]);

    return (
        <FlatList
            style={styles.list}
            data={filteredTasks}
            renderItem={({item}) => <TaskItem task={item}/>}
            keyExtractor={task => `Task #${task.id}`}
        /> 
    );
};

export default TaskList;
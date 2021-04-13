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

const TaskList: FC = () : ReactElement => {
    const { tasks } = useContext(TasksContext) as ITasksContext;
    const [filteredTasks, setFilteredTask] = useState<Array<ITask>>([]);

    useEffect(() => {
        // Setting filteredTasks here to ensure filtering on all tasks
        // (i.e. doing so in declaration leads to empty lists in some cases)
        setFilteredTask(tasks.filter((task : ITask) => task.status !== "complete"));
    }, [tasks]);

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
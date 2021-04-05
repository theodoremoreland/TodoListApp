// React
import React, { FC, ReactElement, useContext } from 'react';
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

    return (
        <FlatList
            style={styles.list}
            data={tasks}
            renderItem={({item}) => <TaskItem task={item}/>}
            keyExtractor={task => `Task #${task._id} - ${task.name}`}
        /> 
    );
};

export default TaskList;
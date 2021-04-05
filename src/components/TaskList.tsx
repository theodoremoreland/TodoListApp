// React
import React, { FC, ReactElement, useContext } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text
} from 'react-native';
import { TasksContext } from '../contexts/TasksContext';

import TaskItem from './TaskItem';

interface IProps {
    tasks: ITaskList
};

const TaskList: FC = () => {
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

const styles = StyleSheet.create({
    list: {
        marginTop: 10,
        paddingHorizontal: 24
    }
});

export default TaskList;
// React
import React, { FC, ReactElement } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';

interface ITask {
    _id: number,
    name: string,
    dueDate: Date
};

const TaskList: FC<{list: Array<ITask>}> = ({list}) : ReactElement => {

    return (
        <FlatList
            style={styles.list}
            data={list}
            renderItem={({item}) => <Text>{item.name}</Text>}
            keyExtractor={task => task.name}
        /> 
    );
};

const styles = StyleSheet.create({
    list: {
        marginTop: 32,
        paddingHorizontal: 24
    }
});

export default TaskList;
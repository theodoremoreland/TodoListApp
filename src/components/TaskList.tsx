import React, { FC, ReactElement } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';

const TaskList: FC<{list: Array<string>}> = ({list}) : ReactElement => {

    return (
        <FlatList
            style={styles.list}
            data={list}
            renderItem={({item}) => <Text>{item}</Text>}
            keyExtractor={item => item}
        /> 
    );
};

const styles = StyleSheet.create({
    list: {
        backgroundColor: "green",
        marginTop: 32,
        paddingHorizontal: 24
    }
});

export default TaskList;
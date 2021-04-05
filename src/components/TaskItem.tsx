// React
import React, { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Text,
    TextInput
} from "react-native";

// Third Party
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProps {
    task: ITask,
};

const TaskItem: FC<IProps> = ({task}) : ReactElement => {
    const { _id, name, note, dueDate } = task;

    return (
        <View style={{backgroundColor: "blue"}}>
            <Text>{name}</Text>
        </View>
    );
};

export default TaskItem;
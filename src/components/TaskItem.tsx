// React
import React, { FC, ReactElement, useState } from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from "react-native";

// Third Party
import Icon from 'react-native-vector-icons/MaterialIcons';

// Custom components
import TaskForm from './TaskForm';

interface IProps {
    task: ITask,
};

const TaskItem: FC<IProps> = ({task}) : ReactElement => {
    const { _id, name, dueDate } = task;
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

    return (
        <>
        <TouchableOpacity onPress={() => setModalIsVisible(true)}>
            <View style={styles.itemContainer}>
                <Text>Task #{`${_id}`}</Text>
                <Text style={styles.itemFont}>{name}</Text>
                <Text>{dueDate.toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
        <TaskForm task={task} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible} />
        </>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 3,
        width: 350,
        height: 70,
        backgroundColor: 'rgba(0, 0, 95, 0.71)',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        
        shadowRadius: 8.30,
        elevation: 13
    },
    itemFont: {
        color: 'white',
        fontSize: 20,
        
    }
});

export default TaskItem;
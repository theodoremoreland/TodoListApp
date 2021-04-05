// React
import React, { FC, ReactElement, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Third party
import Icon from 'react-native-vector-icons/MaterialIcons';

// Custom components
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TasksProvider from '../contexts/TasksContext';

const TasksScreen: FC = () : ReactElement => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

    return (
        <View style={styles.home}>
            <TasksProvider>
                <TaskList />
                <TaskForm
                    title={"Add new task"}
                    task={{_id: -1, name: "", note: "", dueDate: new Date(), status: ""}}
                    modalIsVisible={modalIsVisible}
                    setModalIsVisible={setModalIsVisible}
                />
            </TasksProvider>
            <TouchableOpacity
                onPress={ () => setModalIsVisible(true) }
            >
                <Text style={{marginLeft: 300}}>
                    <Icon name="add-circle" color="rgba(0, 0, 95, 0.71)" size={65}/>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    home: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 112, 112, 0.8)',
        fontFamily: 'Rubik-ExtraBold'
    }
});

export default TasksScreen;
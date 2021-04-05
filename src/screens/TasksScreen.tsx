// React
import React, { FC, ReactElement, useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

// Third party
import Icon from 'react-native-vector-icons/MaterialIcons';

// Custom components
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TasksProvider from '../contexts/TasksContext';

const TasksScreen: FC = () : ReactElement => {
    const [tasks, setTasks] = useState<ITaskList | []>([]);
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

    return (
        <View style={styles.home}>
            <TasksProvider>
                <TaskList />
                <TaskForm
                    task={{_id: -1, name: "", note: "", dueDate: new Date(), status: ""}}
                    modalIsVisible={modalIsVisible}
                    setModalIsVisible={setModalIsVisible}
                />
            </TasksProvider>

            <TouchableOpacity
                    
                    onPress={ () => setModalIsVisible(true) }
                >
                    <Text>
                        <Icon name="add-circle" color="blue" size={55}/>
                    </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    home: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});

export default TasksScreen;
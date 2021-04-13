// React
import React, { FC, ReactElement, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Third party
import Icon from 'react-native-vector-icons/MaterialIcons';

// Custom components
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TasksProvider from '../contexts/TasksContext';

// Styles
import { styles } from '../styles/tasksScreen';

const TasksScreen: FC = () : ReactElement => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);

    return (
        <View style={styles.home}>
            <TasksProvider>
                <TaskList />
                <TaskForm
                    title="Add new task"
                    task={{id: -1, name: "", note: "", dueDate: new Date(), status: "open"}}
                    modalIsVisible={modalIsVisible}
                    setModalIsVisible={setModalIsVisible}
                />
            </TasksProvider>
            <TouchableOpacity
                onPress={ () => setModalIsVisible(true) }
            >
                <Text style={{marginLeft: 300}}>
                    <Icon name="add-circle" color="#0366d6" size={65}/>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TasksScreen;
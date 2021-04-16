// React
import React, { FC, ReactElement, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Third party
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

// Custom components
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TasksProvider from '../contexts/TasksContext';

// Styles
import { styles } from '../styles/tasksScreen';

const TasksScreen: FC<any> = ({ navigation }) : ReactElement => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
    const [listType, setListType] = useState<"all" | "open" | "complete" | "overdue">("all");

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{flex:1, padding: 0, margin: 0, width: 200, height: 100, }}>
                <Picker
                    style={{color: "white"}}
                    dropdownIconColor="#fff"
                    mode="dropdown"
                    selectedValue={listType}
                    onValueChange={(itemValue) => setListType(itemValue)}
                >
                    <Picker.Item label="All tasks" value="all" />
                    <Picker.Item label="Open tasks" value="open" />
                    <Picker.Item label="Completed tasks" value="complete" />
                    <Picker.Item label="Overdue tasks" value="overdue" />
                </Picker>
            </View>
          ),
        });
      }, [navigation, listType]);

    return (
        <View style={styles.home}>
            <TasksProvider>
                <TaskList listType={listType}/>
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
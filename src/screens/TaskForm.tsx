// React
import React, { FC, ReactElement, useContext, useState } from 'react';
import { 
    View,
    TouchableOpacity,
    Modal,
    Text,
    TextInput,
    Alert
} from "react-native";

// Third Party
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Context
import { TasksContext } from '../contexts/TasksContext';

// Controller
import { validateSubmission } from '../controllers/TaskForm.controller';

// Styles
import { styles } from '../styles/taskForm.styles';

interface IProps {
    title: string,
    task: ITask,
    modalIsVisible: boolean
    setModalIsVisible: (bool: boolean) => void,
};

// TODO test performance
const TaskForm: FC<any> = ({ route, navigation }) : ReactElement => {
    const { addTask, updateTask, removeTask } = useContext(TasksContext) as ITasksContext;
    const { title, task } = route.params 
    const { id, name, note, dueDate, status } = task ? task : {id: -1, name: "", note: "", dueDate: new Date(), status: "open"};
    const [newTaskName, setNewTaskName] = useState<string>(name);
    const [newNote, setNewNote] = useState<string>(note);
    const [newDueDate, setNewDueDate] = useState<Date>(dueDate);

    const submitNewTask = (task : ITask) : void => {
        if (validateSubmission(newTaskName, newDueDate)) {
            addTask(task);
            navigation.goBack();
            Alert.alert("Task added.");
        };
    };

    const submitUpdatedTask = (task : ITask) : void => {
        if (validateSubmission(newTaskName, newDueDate)) {
            updateTask(task);
            navigation.goBack();
            Alert.alert("Task updated.");
        };
    };

    const submitRemoveTask = (task : ITask) : void => {
            removeTask(task);
            navigation.goBack();
            Alert.alert("Task deleted.");
    };

    return (
        <>
            <View style={styles.form}>
                <Text style={styles.label}>Name of task</Text>
                <TextInput
                    autoFocus
                    style={styles.input}
                    onChangeText={setNewTaskName}
                    value={newTaskName}
                    placeholder="What should be done?"
                    placeholderTextColor="grey"
                />
                <Text style={styles.label}>Note</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNewNote}
                    value={newNote}
                    placeholder="An important reminder about the task."
                    placeholderTextColor="grey"
                />
                <Text style={styles.label}>Due date</Text>
                <DatePicker
                    style={styles.datePicker}
                    date={newDueDate}
                    onDateChange={setNewDueDate}
                />
                {/* TODO "dry" the codeblock below */}
                {
                    title === "Add new task"
                        ?   <TouchableOpacity
                                style={styles.addTaskButtonContainer}
                                onPress={ () => submitNewTask({id, name: newTaskName, note: newNote, dueDate: newDueDate, status: "open"}) }
                            >
                                <Text>
                                    <Icon name="add-task" color="#0366d6" size={55}/>
                                </Text>
                            </TouchableOpacity>
                        :   <>
                                <TouchableOpacity
                                    style={styles.deleteTaskButtonContainer}
                                    onPress={ () => submitRemoveTask(task) }
                                >
                                    <Text>
                                        <Icon name="delete" color="#d73a49" size={55}/>
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.updateTaskButtonContainer}
                                    onPress={ () => submitUpdatedTask({id, name: newTaskName, note: newNote, dueDate: newDueDate, status}) }
                                >
                                    <Text>
                                        <Icon name="update" color="#0366d6" size={55}/>
                                    </Text>
                                </TouchableOpacity>
                            </>
                }
            </View>
            </>
    );
};

export default TaskForm;
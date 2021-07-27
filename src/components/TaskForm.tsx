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

// Styles
import { styles } from '../styles/taskForm.styles';

interface IProps {
    title: string,
    task: ITask,
    modalIsVisible: boolean
    setModalIsVisible: (bool: boolean) => void,
};

// TODO test performance
const TaskForm: FC<IProps> = ({ title, task, modalIsVisible, setModalIsVisible}) : ReactElement => {
    const { addTask, updateTask, removeTask } = useContext(TasksContext) as ITasksContext;
    const { id, name, note, dueDate, status } = task;
    const [newTaskName, setNewTaskName] = useState<string>(name);
    const [newNote, setNewNote] = useState<string>(note);
    const [newDueDate, setNewDueDate] = useState<Date>(dueDate);

    const clearForm = () : void => {
        setNewTaskName("");
        setNewNote("");
        setNewDueDate(new Date());
    };

    const validateSubmission = () : boolean => {
        let alert : string = "";
        const fieldIsFalsy : boolean = newTaskName == "";
        const dateIsInPast : boolean = (newDueDate < new Date());
        alert = fieldIsFalsy ? "Task must have a name." : alert;
        alert = dateIsInPast ? alert + "\nDue date must be in the future." : alert;

        if(fieldIsFalsy || dateIsInPast) {
            Alert.alert(alert);
            return false;
        };

        return true;
    };

    const submitNewTask = (task : ITask) : void => {
        if (validateSubmission()) {
            addTask(task);
            clearForm();
            setModalIsVisible(false);
            Alert.alert("Task added.");
        };
    };

    const submitUpdatedTask = (task : ITask) : void => {
        if (validateSubmission()) {
            updateTask(task);
            setModalIsVisible(false);
            Alert.alert("Task updated.");
        };
    };

    const submitRemoveTask = (task : ITask) : void => {
            removeTask(task);
            setModalIsVisible(false);
            Alert.alert("Task deleted.");
    };

    return (
        <Modal
            style={styles.modal}
            animationType="slide"
            transparent={false}
            visible={modalIsVisible}
            onRequestClose={() => {
                setModalIsVisible(!modalIsVisible);
            }}
        >   
            <View style={styles.modalHeader}>
                <TouchableOpacity
                    onPress={ () => setModalIsVisible(false) }
                >
                    <Text style={styles.backArrow}>
                        <Icon name="arrow-back" color="white" size={35}/>
                    </Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                        <Text>{title}</Text>
                </Text>
            </View>
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
        </Modal>
    );
};

export default TaskForm;
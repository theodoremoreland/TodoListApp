// React
import React, { FC, ReactElement, useContext, useState } from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Text,
    TextInput,
    Alert
} from "react-native";

// Third Party
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TasksContext } from '../contexts/TasksContext';

interface IProps {
    title: string,
    task: ITask,
    modalIsVisible: boolean
    setModalIsVisible: (bool: boolean) => void,
};

// TODO utilize useCallback hook
const TaskForm: FC<IProps> = ({ title, task, modalIsVisible, setModalIsVisible}) : ReactElement => {
    const { tasks, addTask, updateTask, removeTask } = useContext(TasksContext) as ITasksContext;
    const { _id, name, note, dueDate } = task;
    const [newTaskName, setNewTaskName] = useState<string>(name);
    const [newNote, setNewNote] = useState<string>(note);
    const [newDueDate, setNewDueDate] = useState<Date>(dueDate);

    const generateTaskID = () : number => {
        if (tasks.length === 0) {
            return 1;
        };
        
        // assumes tasks are sorted by _ids from smallest to largest
        const currentHighestID : number = tasks[tasks.length -1 ]._id;
        return currentHighestID + 1;
    };

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
                    <Text style={{marginTop: 7}}>
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
                />
                <Text style={styles.label}>Note</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNewNote}
                    value={newNote}
                    placeholder="An important reminder about the task."
                />
                <Text style={styles.label}>Due date</Text>
                <DatePicker
                    date={newDueDate}
                    onDateChange={setNewDueDate}
                />
                {/* TODO "dry" the codeblock below */}
                {
                    title === "Add new task"
                        ?   <TouchableOpacity
                                onPress={ () => submitNewTask({_id: generateTaskID(), name: newTaskName, note: newNote, dueDate: newDueDate, status: "incomplete"}) }
                            >
                                <Text style={{marginLeft: 310}}>
                                    <Icon name="add-task" color="blue" size={55}/>
                                </Text>
                            </TouchableOpacity>
                        :   <>
                                <TouchableOpacity
                                        onPress={ () => submitRemoveTask({_id: _id, name: newTaskName, note: newNote, dueDate: newDueDate, status: "incomplete"}) }
                                    >
                                        <Text style={{marginLeft: 310}}>
                                            <Icon name="delete" color="red" size={55}/>
                                        </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                        onPress={ () => submitUpdatedTask({_id: _id, name: newTaskName, note: newNote, dueDate: newDueDate, status: "incomplete"}) }
                                    >
                                        <Text style={{marginLeft: 310}}>
                                            <Icon name="update" color="blue" size={55}/>
                                        </Text>
                                </TouchableOpacity>
                            </>
                }
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "black"
    },
    modalHeader: {
        zIndex: 1,
        elevation: 1,
        position: "absolute",
        top: 0,
        backgroundColor: "blue",
        height: 50,
        width: "100%"
    },
    title : {
        fontFamily: "Rubik-Medium",
        fontSize: 20,
        color: "white",
        marginTop: 0
    },
    form: {
        marginTop: 65,
    },
    label: {
        fontSize: 20,
        fontFamily: "Rubik-Light",
        marginLeft: 13,
        marginTop: 10
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      flexShrink: 0
    },
    button: {
        height: 80,
        width: 80,
        borderRadius: 200,
        backgroundColor: "blue"
    },
    buttonText: {
        color: "white",
        marginTop: 15
    }
  });

export default TaskForm;
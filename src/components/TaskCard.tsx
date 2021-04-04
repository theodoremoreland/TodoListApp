// React
import React, { FC, ReactElement, useState } from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Text,
    TextInput
} from "react-native";

// Third Party
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ITask {
    _id: number,
    name: string,
    note: string,
    dueDate: Date
};

interface IProps {
    task: ITask,
    modalIsVisible: boolean
    setModalIsVisible: (bool: boolean) => void,
};

const TaskCard: FC<IProps> = ({task, modalIsVisible, setModalIsVisible}) : ReactElement => {
    const { _id, name, note, dueDate } = task;
    const [newTaskName, setNewTaskName] = useState<string>(name);
    const [newNote, setNewNote] = useState<string>(note);
    const [newDueDate, setNewDueDate] = useState<Date>(dueDate);

    return (
        <Modal
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
                    <Text>
                        <Icon name="arrow-back" color="white" size={35}/>
                    </Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.form}>
                <Text>Name of task</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNewTaskName}
                    value={newTaskName}
                    placeholder="What should be done?"
                />
                <Text>Note</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNewNote}
                    value={newNote}
                    placeholder="An important reminder about the task."
                />
                <Text>Due date</Text>
                <DatePicker
                    date={newDueDate}
                    onDateChange={setNewDueDate}
                />
                <TouchableOpacity
                    
                    onPress={ () => setModalIsVisible(false) }
                >
                    <Text>
                        <Icon name="add-task" color="blue" size={55}/>
                    </Text>
                </TouchableOpacity>
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
    form: {
        marginTop: 65
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

export default TaskCard;
// React
import React, { FC, ReactElement, useState } from 'react';
import { 
    View,
    StyleSheet,
    Button,
    Modal,
    TextInput 
} from "react-native";

// Third Party
import DatePicker from 'react-native-date-picker';

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
            transparent={true}
            visible={modalIsVisible}
            onRequestClose={() => {
                setModalIsVisible(!modalIsVisible);
            }}
        >
            <View style={{ marginTop: 100, justifyContent: 'center' }}>
                <TextInput
                    
                    style={styles.input}
                    onChangeText={setNewTaskName}
                    value={newTaskName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setNewNote}
                    value={newNote}
                    placeholder="Notes"
                />
                <DatePicker
                    date={newDueDate}
                    onDateChange={setNewDueDate}
                />
                <Button
                    title="Add Task"
                    onPress={ () => "" }
                />
                <Button
                    title="Cancel"
                    onPress={ () => setModalIsVisible(false) }
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
  });

export default TaskCard;
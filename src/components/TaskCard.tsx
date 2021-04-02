// React
import React, { FC, ReactElement, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

// Third Party
import DatePicker from 'react-native-date-picker';

interface ITask {
    _id: number,
    name: string,
    note?: string,
    dueDate: Date
};

const TaskCard: FC<ITask> = ({_id, name, dueDate}) : ReactElement => {

    const [newTaskName, setNewTaskName] = useState<string>();
    const [newNote, setNewNote] = useState<string>();
    const [newDueDate, setNewDueDate] = useState<Date>();

    return (
        <SafeAreaView>
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
                keyboardType="numeric"
            />
            <DatePicker
                date={newDueDate}
                onDateChange={setNewDueDate}
            />
        </SafeAreaView>
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
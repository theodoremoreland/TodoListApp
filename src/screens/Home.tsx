// React
import React, { FC, ReactElement, useContext, useState } from 'react';
import { StyleSheet, View, Button, Text, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

// Context
import { ThemeContext } from '../App';

// Custom components
import TaskCard from '../components/TaskCard';
import TaskList from '../components/TaskList';

interface ITask {
    _id: number,
    name: string,
    dueDate: Date
};

const Home: FC = () : ReactElement => {
    const context = useContext(ThemeContext);
    const [todos, setTodos] = useState<Array<ITask> | []>([]);

    const addTask = (newTask : ITask) : void => {
        setTodos([...todos, newTask]);
    };

    return (
        <View style={styles.home}>
            <TaskList list={todos}/>
            <Button
                title="Add Task"
                onPress={ () => addTask({_id: 1, name: "hghg", dueDate: new Date()}) }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    home: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});

export default Home;
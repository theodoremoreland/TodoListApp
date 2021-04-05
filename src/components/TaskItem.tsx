// React
import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { 
    View,
    TouchableOpacity,
    Text
} from "react-native";

// Third Party
import Icon from 'react-native-vector-icons/MaterialIcons';

// Custom components
import TaskForm from './TaskForm';

// Context
import { TasksContext } from '../contexts/TasksContext';

// Styles
import { styles } from '../styles/taskItem';

interface IProps {
    task: ITask
};

const TaskItem: FC<IProps> = ({task}) : ReactElement => {
    const { updateTask } = useContext(TasksContext) as ITasksContext;
    const { _id, name, dueDate } = task;
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
    const taskIsOverdue : boolean = new Date() > dueDate;
    const statusColor : string = taskIsOverdue ? "#d73a49" : "#1485FF";
    
    useEffect(() => {
        if (taskIsOverdue && task.status !== "overdue") {
            updateTask({...task, status: "overdue"})
        }
    }, []);

    return (
        <>
        <TouchableOpacity style={styles.itemContainer} onPress={() => setModalIsVisible(true)}>
            <View>
                <Text style={{fontFamily: 'Rubik-Lightitalic', color: "white", fontSize: 12, marginLeft: 6, marginTop: 2}}>id #{`${_id}`}</Text>
                <Text style={styles.itemFont}>{name}</Text>
                <Text style={{color: statusColor, fontFamily: "Rubik-Light", fontSize: 15, marginLeft: 270}}>{dueDate.toLocaleDateString()}</Text>
            </View>
        </TouchableOpacity>
        <TaskForm title={"Modify task"} task={task} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible} />
        </>
    );
};

export default TaskItem;
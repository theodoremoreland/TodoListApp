// React
import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { 
    View,
    TouchableOpacity,
    Text
} from "react-native";

// Third Party
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from 'react-native-vector-icons/MaterialIcons';

// Context
import { TasksContext } from '../contexts/TasksContext';

// Controller
import { handleCheckboxChange } from '../controllers/TaskItem.controller';

// Custom components
import TaskForm from './TaskForm';

// Styles
import { styles } from '../styles/taskItem.styles';

interface IProps {
    task: ITask
};

const TaskItem: FC<IProps> = ({ task }) : ReactElement => {
    const { updateTask } = useContext(TasksContext) as ITasksContext;
    const { id, name, note, dueDate, status } = task;
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
    const taskIsOverdue : boolean = (new Date() > dueDate) && (status === "open") || status === "overdue";
    const statusColor : string = taskIsOverdue ? "#d73a49" : "#1485FF";
    const [markAsCompletedCountdown, setMarkAsCompletedCountdown] = useState<ReturnType<typeof setTimeout>>(setTimeout(() => undefined));

    useEffect(() => {
        if (taskIsOverdue && task.status !== "overdue") {
            updateTask({id, name, note, dueDate,  status: "overdue"})
        }
    }, []);

    return (
        <>
            <View style={styles.itemContainer}>
                <View style={styles.checkboxContainer}>
                    <BouncyCheckbox
                        size={30}
                        fillColor="#28a745"
                        unfillColor="#FFFFFF"
                        text={
                            name.length >= 15
                                ? name.substring(0, 14) + "..."
                                : name
                        }
                        textStyle={styles.itemFont}
                        iconStyle={{ borderColor: "#28a745" }}
                        isChecked={task.status === "complete"}
                        onPress={(isChecked: boolean) => handleCheckboxChange(isChecked, markAsCompletedCountdown, setMarkAsCompletedCountdown, updateTask, task)} 
                    />
                </View>
                <TouchableOpacity style={styles.notesIconContainer} onPress={() => setModalIsVisible(true)}>
                    <Icon name="notes" color="white" size={55}/>
                </TouchableOpacity>
            </View>
            <Text style={[styles.dateText, { color: statusColor } ]}>
                    {dueDate.toLocaleString()}
            </Text>
            <TaskForm title={"Modify task"} task={task} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible} />
        </>
    );
};

export default TaskItem;
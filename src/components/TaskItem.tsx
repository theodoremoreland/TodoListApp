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

// Custom components
import TaskForm from './TaskForm';

// Styles
import { styles } from '../styles/taskItem.styles';

interface IProps {
    task: ITask
};

const TaskItem: FC<IProps> = ({task}) : ReactElement => {
    const { updateTask } = useContext(TasksContext) as ITasksContext;
    const { id, name, note, dueDate, status } = task;
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
    const taskIsOverdue : boolean = (new Date() > dueDate) && (status === "open") || status === "overdue";
    const statusColor : string = taskIsOverdue ? "#d73a49" : "#1485FF";
    const [markAsCompletedCountdown, setMarkAsCompletedCountdown] = useState<ReturnType<typeof setTimeout>>(setTimeout(() => undefined));

    const handleCheckboxChange = (isChecked: boolean) : void => {
        clearTimeout(markAsCompletedCountdown);
        
        if (isChecked) {
            // ! Set timeout is used to delay the updating of the task as to allow the checkbox + strikethrough animation to complete
            // ! If a user checks multiple tasks in succession too quickly, the tasks checked first do not update properly
            // ! Because of this, the timeout is set to 500ms to ensure the updates occur quickly enough that the user can't check another task.
            // TODO ^^^ This is not ideal. investigate a better UX solution.
            setMarkAsCompletedCountdown(setTimeout(() => updateTask({id, name, note, dueDate, "status": "complete"}), 500));
        }
        else if (!isChecked && status === "complete"){
            updateTask({id, name, note, dueDate,  "status": "open"});
        }
    };

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
                        onPress={(isChecked: boolean) => handleCheckboxChange(isChecked)} 
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
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
    
    const handleCheckboxChange = (isChecked: boolean) : void => {
        if (isChecked) {
            updateTask({...task, "status": "complete"});
        }
        else if (!isChecked && task.status === "complete"){
            updateTask({...task, "status": "incomplete"});
        };
    };

    useEffect(() => {
        if (taskIsOverdue && task.status !== "overdue") {
            updateTask({...task, status: "overdue"})
        }
    }, []);

    return (
        <>
            <View style={styles.itemContainer}>
                <View style={{ marginLeft: 10, marginTop: 19}}>
                    <BouncyCheckbox
                        size={30}
                        fillColor="#28a745"
                        unfillColor="#FFFFFF"
                        text={name}
                        textStyle={styles.itemFont}
                        iconStyle={{ borderColor: "#28a745" }}
                        onPress={(isChecked: boolean) => handleCheckboxChange(isChecked)} 
                    />
                </View>
                <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: 10, marginTop: -40 }} onPress={() => setModalIsVisible(true)}>
                    <Icon name="notes" color="white" size={55}/>
                </TouchableOpacity>
            </View>
            <Text style={{color: statusColor, elevation: 12, fontFamily: "Rubik-Light", fontSize: 15, position: "absolute", top: 55, left: 10}}>
                    {dueDate.toLocaleString()}
            </Text>
            <TaskForm title={"Modify task"} task={task} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible} />
        </>
    );
};

export default TaskItem;
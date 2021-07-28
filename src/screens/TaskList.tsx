// React
import React, { FC, ReactElement, useState, useLayoutEffect, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Third party
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

// Context
import { TasksContext } from '../contexts/TasksContext';

// Controller
import { filterTasks } from '../controllers/TaskList.controller';

// Components
import TaskItem from '../components/TaskItem';

// Styles
import { styles } from '../styles/taskList.styles';


const TaskList: FC<any> = ({ navigation }) : ReactElement => {
    const { tasks } = useContext(TasksContext) as ITasksContext;
    const [listType, setListType] = useState<"all" | "open" | "complete" | "overdue">("all");
    const [filteredTasks, setFilteredTask] = useState<Array<ITask>>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={styles.headerContainer}>
                <Picker
                    style={{color: "white"}}
                    dropdownIconColor="#fff"
                    mode="dropdown"
                    selectedValue={listType}
                    onValueChange={(itemValue) => setListType(itemValue)}
                >
                    <Picker.Item label="All tasks" value="all" style={styles.pickerItem}/>
                    <Picker.Item label="Open tasks" value="open" style={styles.pickerItem}/>
                    <Picker.Item label="Completed tasks" value="complete" style={styles.pickerItem}/>
                    <Picker.Item label="Overdue tasks" value="overdue" style={styles.pickerItem}/>
                </Picker>
            </View>
          ),
        });
      }, [listType, navigation]);

      useEffect(() => {
        // Setting filteredTasks here to ensure filtering on all tasks
        // (i.e. doing so in declaration leads to empty lists in some cases)
        const filteredTasks = filterTasks([...tasks], listType);

        setFilteredTask(filteredTasks);
    }, [tasks, listType]);

    return (
        <View style={styles.home}>
            <FlatList
                style={styles.list}
                data={filteredTasks}
                renderItem={({item}) => <TaskItem task={item} navigation={navigation} />}
                keyExtractor={task => `Task #${task.id}`}
            /> 
            <TouchableOpacity
                onPress={ () => navigation.navigate("Task Form", { title :"Add new task" } )
                }
                style={styles.bottomRightButton}
            >
                <Text>
                    <Icon name="add-circle" color="#0366d6" size={65} />
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TaskList;
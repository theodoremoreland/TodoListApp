// React
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Context
import TasksProvider from './contexts/TasksContext';

// Screens
import TaskForm from './screens/TaskForm'
import TaskList from './screens/TaskList';

const Stack = createStackNavigator();

export default function App() {

  return (
    <TasksProvider>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              name="Todo List"
              component={TaskList} 
              options={{
                headerStyle: {
                  backgroundColor: '#24292e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontFamily: "Rubik-Regular"
                },
              }}
            />
            <Stack.Screen
              name="Task Form"
              component={TaskForm}
              options={({route}) => ({ title: route.params.title })}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}
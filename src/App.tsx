// React
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import TasksScreen from './screens/TasksScreen';

const Stack = createStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Todo List" component={TasksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
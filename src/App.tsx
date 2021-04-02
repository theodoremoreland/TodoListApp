// React
import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Custom Components
import HomeScreen from './screens/Home';

export const ThemeContext = React.createContext("");
const Stack = createStackNavigator();

export default function App() {
  const colorScheme : string = useColorScheme() || "light";

  return (
    <ThemeContext.Provider value={colorScheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Todo List" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
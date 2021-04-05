// React
import 'react-native-gesture-handler';
import React, { FC, ReactElement, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export const ThemeContext = React.createContext<string>("light");

const ThemeProvider: FC<ReactNode> = ({children}) : ReactElement => {
    const theme : string = useColorScheme() || "light";

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
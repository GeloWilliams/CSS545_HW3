import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/context/ThemeContext';

import Home from './src/screens/home';
import StoryPage from './src/screens/story';
import AppStateManager from './src/components/AppStateManager';

const Stack = createStackNavigator();

const App = () => {
    return (
        <ThemeProvider>
            <AppStateManager />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Story" component={StoryPage} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;
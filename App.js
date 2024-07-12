import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CustomerBottomTabNavigator from './navigation/BottomTabNavigator';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{ headerShown: false,}}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false,}} />
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false,}} />
        <Stack.Screen name='HomeScreen' component={CustomerBottomTabNavigator}  options={{ headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

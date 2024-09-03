/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, PermissionsAndroid, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import { enableScreens } from 'react-native-screens';

enableScreens();
// import Splash from './src/screens/Splash';
import Login from './src/Screen/Login';
import RegistrationForm from './src/Screen/RegistrationForm';
import Splash from './src/Screen/Splash';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator >
       <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />

        <Stack.Screen name="Login" component={Login}
          options={{ title: 'Login Screen' }}/>

        <Stack.Screen name="Registration" component={RegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

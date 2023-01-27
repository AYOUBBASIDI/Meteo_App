
import { ImageBackground , Image , View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Login from './screens/Login.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard.js';
import Register from './screens/Register.js';
import SplashScreen from './screens/SplashScreen.js';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
        
    <NavigationContainer cardStyle={{flex:1}}>
      <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}




export default App;
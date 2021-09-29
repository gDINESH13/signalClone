
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Login from './screens/Login';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import AddChat from './screens/AddChat';
import Chat from './screens/Chat';



const stack=createStackNavigator()

const globalScreenOpitons={
  headerStyle:{backgroundColor:'#2C6BED'},
  headerTitleStyle:{color:'white',alignSelf:'center'},
  headerTintColor:'white',
}

export default function App() {
  return (
    <NavigationContainer >
      <stack.Navigator screenOptions={globalScreenOpitons}>
        <stack.Screen  
          name="login" 
          component={Login} 
          />
        <stack.Screen  
          name="register" 
          component={RegisterScreen} 
          />
        <stack.Screen  
          name="home" 
          component={Home} 
          />
        <stack.Screen  
          name="addChat" 
          component={AddChat} 
          />
        <stack.Screen  
          name="chat" 
          component={Chat} 
          />
      </stack.Navigator>
    </NavigationContainer> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

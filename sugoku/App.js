
import React from 'react';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from './screens/Home'
import Game from './screens/Game'
import Finish from './screens/Finish'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="Game" component={Game}/>
          <Stack.Screen name="Finish" component={Finish}/>
      </Stack.Navigator>
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
  input: {
    borderWidth: 1,
    width: 40,
    height: 40,
    borderColor: '#777',
  }
});

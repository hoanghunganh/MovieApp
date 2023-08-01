import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import PersonScreen from './screens/PersonScreen';
import SearchScreen from './screens/SearchScreen';

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}}  name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}}  name="Movie" component={MovieScreen} />
        <Stack.Screen options={{headerShown: false}}  name="Person" component={PersonScreen} />
        <Stack.Screen options={{headerShown: false}}  name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
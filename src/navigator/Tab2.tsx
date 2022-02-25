import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import PokemonScreen from '../screens/PokemonScreen';
import SearchScreen from '../screens/SearchScreen';
import {RouteStackParams} from './Tab1';

const Tab2 = createStackNavigator<RouteStackParams>();

const Tab2Stack = () => {
  return (
    <Tab2.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Tab2.Screen name="HomeScreen" component={SearchScreen} />
      <Tab2.Screen name="PokemonScreen" component={PokemonScreen} />
    </Tab2.Navigator>
  );
};

export default Tab2Stack;

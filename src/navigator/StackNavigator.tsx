import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SimplePokemon} from '../interfaces';

import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';

export type RouteStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {
    pokemon: SimplePokemon;
    color: string;
  };
};

const Stack = createStackNavigator<RouteStackParams>();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;

import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import StackNavigator from './StackNavigator';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={s.tab}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        tabBarStyle: {
          height: 60,
          borderWidth: 0,
          elevation: 0,
          // Controlar con scroll la visibilidad
          // marginBottom: -50,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({color, size}) => (
            <Icon color={color} name="list-outline" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Busqueda',
          tabBarIcon: ({color, size}) => (
            <Icon color={color} name="search-outline" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const s = StyleSheet.create({
  tab: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
export default Tabs;

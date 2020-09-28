import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import askscreen from '../screens/askScreen';


export const AppTabNavigator = createBottomTabNavigator({
  askScreen : {
    screen: AppStackNavigator,
    navigationOptions :{
      tabBarLabel : "Answer a Question",
    }
  },
  answerScreen: {
    screen: askscreen,
    navigationOptions :{
      tabBarLabel : "Ask a Question",
    }
  }
});

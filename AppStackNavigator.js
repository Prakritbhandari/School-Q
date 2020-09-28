import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import answer from '../screens/answer';
import answerScreen from '../screens/answerScreen';




export const AppStackNavigator = createStackNavigator({
  answerScreen : {
    screen : answerScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  answer : {
    screen : answer,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'answerScreen'
  }
);

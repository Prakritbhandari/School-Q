import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu  from './CustomSideBarMenu';
import answerScreen from '../screens/answerScreen'
import askScreen from '../screens/askScreen' 
import settingScreen from '../screens/settingScreen' 

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : answerScreen
    },

  askScreen : {
    screen : askScreen
  },

  settingScreen : {
    screen : settingScreen
  },
},
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
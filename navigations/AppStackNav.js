import React from "react";
import Home from "../screens/home";
import DetailScreen from "../screens/DetailScreen";
import { createStackNavigator } from "react-navigation";

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    DetailScreen: {
      screen: DetailScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default AppStack;

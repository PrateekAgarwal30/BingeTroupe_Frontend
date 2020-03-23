import React from "react";
import Home from "../screens/home";
import { createStackNavigator } from "react-navigation";

const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default AppStack;

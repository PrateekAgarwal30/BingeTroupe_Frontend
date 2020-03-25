import React from "react";
import Home from "../screens/home";
import DetailScreen from "../screens/DetailScreen";
import { createStackNavigator } from "react-navigation";
import FullScreenPlayer from "../screens/FullScreenPlayer";
const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    DetailScreen: {
      screen: DetailScreen
    },
    FullScreenPlayer: {
      screen: FullScreenPlayer
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default AppStack;

import React from "react";
import Home from "../screens/home";
import DetailScreen from "../screens/DetailScreen";
import { createStackNavigator } from "react-navigation";
import FullScreenPlayer from "../screens/FullScreenPlayer";
import SearchScreen from "../screens/SearchScreen";
import MyWatchList from "../screens/MyWatchList";
const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    DetailScreen: {
      screen: DetailScreen
    },
    MyWatchList: {
      screen: MyWatchList
    },
    SearchScreen: {
      screen: SearchScreen
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

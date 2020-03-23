import React from "react";
// import AuthStack from "./AuthStackNav";
import AppDrawerNav from "./AppDrawerNav";
import { createSwitchNavigator } from "react-navigation";
import AuthLoading from "../screens/AuthLoading";

export const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    AppDrawerNav: AppDrawerNav,
    // AuthStack: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

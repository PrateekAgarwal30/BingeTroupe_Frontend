import React from "react";
import Login from "../screens/login";
import Register from "../screens/register";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";
const AuthStack = createAnimatedSwitchNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    }
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-top"
          durationMs={250}
          interpolation="easeIn"
        />
        <Transition.In type="slide-bottom" durationMs={350} />
      </Transition.Together>
    ),
    initialRouteName: "Login"
  }
);
export default AuthStack;

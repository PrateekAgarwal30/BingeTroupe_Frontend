import AppStack from "./AppStackNav";
import Drawer from "../screens/drawer";
import { createDrawerNavigator } from "react-navigation";

const DrawerNavigator = createDrawerNavigator(
  {
    AppStack: {
      screen: AppStack
    }
  },
  {
    initialRouteName: "AppStack",
    contentComponent: Drawer,
    drawerType: "front",
    hideStatusBar: true,
    statusBarAnimation: true
  }
);

export default DrawerNavigator;

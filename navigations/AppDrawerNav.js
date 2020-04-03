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
    drawerType: "slide",
    hideStatusBar: true,
    statusBarAnimation: true,
    drawerWidth:75
  }
);

export default DrawerNavigator;

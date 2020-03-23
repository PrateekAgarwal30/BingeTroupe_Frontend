import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { AsyncStorage } from "react-native";
import appEventUtil from "./../utils/eventUtil";
const themes = {
  light: {
    primary: "#E19D40",
    secondary: "#E19C10",
    background: "#EDEEF1"
  },
  dark: {
    primary: "#102236",
    secondary: "#001121",
    background: "#122c45"
  }
};

const defaultValue = {
  networkInfo: {
    details: {
      isConnectionExpensive: false
    },
    isConnected: false,
    type: "mobile"
  },
  themeData: themes["light"],
  theme: "light"
};

const {
  Provider: AppContextProvider,
  Consumer: AppContextConsumer
} = React.createContext(defaultValue);

const AppContextHOC = WrapperComponent => {
  class Child extends React.Component {
    state = defaultValue;
    async componentDidMount() {
      this.unsubscribe = NetInfo.addEventListener(newNetworkState => {
        if (
          JSON.stringify(this.state.networkInfo) !==
          JSON.stringify(newNetworkState)
        ) {
          this.setState({
            ...this.state,
            networkInfo: newNetworkState
          });
        }
      });
      this.onThemeChange();
      appEventUtil.on("theme_changed", this.onThemeChange);
    }
    componentWillUnmount() {
      console.log("unsubscribed");
      this.unsubscribe();
    }
    onThemeChange = async () => {
      console.log("THEME CHANGED");
      const defaultTheme = await AsyncStorage.getItem("theme");
      if (defaultTheme === "dark") {
        this.setState({
          ...this.state,
          themeData: themes["dark"],
          theme: "dark"
        });
      } else {
        this.setState({
          ...this.state,
          themeData: themes["light"],
          theme: "light"
        });
      }
    };
    render() {
      return (
        <AppContextProvider value={this.state}>
          <WrapperComponent />
        </AppContextProvider>
      );
    }
  }
  return Child;
};

export const withAppContextConsumer = WrapperComponent => {
  class Child extends React.Component {
    static contextType = AppContextConsumer;
    static navigationOptions = {
      header: null
    };
    render() {
      return (
        <WrapperComponent
          {...this.props}
          networkInfo={this.context.networkInfo || {}}
          themes={this.context.themeData}
          defaultTheme={this.context.theme}
        />
      );
    }
  }
  return Child;
};

export default AppContextHOC;

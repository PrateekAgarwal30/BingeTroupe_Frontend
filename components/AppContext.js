import React from "react";
import NetInfo from "@react-native-community/netinfo";
import { AsyncStorage } from "react-native";
import appEventUtil from "./../utils/eventUtil";
const themes = {
  dark: {
    primary: "#E19D40",
    secondary: "#E19C10",
    background: "#EDEEF1",
    primaryTextColor: "#fff",
    secondaryTextColor: "#000",
  },
  light: {
    primary: "#001121",
    secondary: "#001121",
    background: "#E1E0E2",
    primaryTextColor: "#000",
    secondaryTextColor: "#fff",
  },
  otherOption: {
    primary: "#001121",
    secondary: "#001121",
    background: "#E1E0E2",
    primaryTextColor: "#fff",
    secondaryTextColor: "#000",
  },
};

const defaultValue = {
  networkInfo: {
    details: {
      isConnectionExpensive: false,
    },
    isConnected: false,
    type: "mobile",
  },
  themeData: themes["light"],
  theme: "light",
  currentActiveScreen: null,
};

const {
  Provider: AppContextProvider,
  Consumer: AppContextConsumer,
} = React.createContext(defaultValue);

const AppContextHOC = (WrapperComponent) => {
  class Child extends React.Component {
    state = defaultValue;
    async componentDidMount() {
      this.unsubscribe = NetInfo.addEventListener((newNetworkState) => {
        if (
          JSON.stringify(this.state.networkInfo) !==
          JSON.stringify(newNetworkState)
        ) {
          this.setState({
            ...this.state,
            networkInfo: newNetworkState,
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
          theme: "dark",
        });
      } else {
        this.setState({
          ...this.state,
          themeData: themes["light"],
          theme: "light",
        });
      }
    };
    getActiveRouteName = (state) => {
      const route = state.routes[state.index];
      if (route.routes) {
        this.getActiveRouteName(route);
      } else {
        if (this.state.currentActiveScreen != route.routeName) {
          this.setState((prevState) => ({
            ...prevState,
            currentActiveScreen: route.routeName,
          }));
        }
      }
    };
    render() {
      return (
        <AppContextProvider value={this.state}>
          <WrapperComponent onNavigationStateChange={this.getActiveRouteName} />
        </AppContextProvider>
      );
    }
  }
  return Child;
};

export const withAppContextConsumer = (WrapperComponent) => {
  class Child extends React.Component {
    static contextType = AppContextConsumer;
    static navigationOptions = {
      header: null,
    };
    render() {
      return (
        <WrapperComponent
          {...this.props}
          networkInfo={this.context.networkInfo || {}}
          themes={this.context.themeData}
          defaultTheme={this.context.theme}
          currentActiveScreen={this.context.currentActiveScreen}
        />
      );
    }
  }
  return Child;
};

export default AppContextHOC;

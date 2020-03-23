import React from "react";
import NetInfo from "@react-native-community/netinfo";
const defaultValue = {
  networkInfo: {
    details: {
      isConnectionExpensive: false
    },
    isConnected: false,
    type: "mobile"
  },
  themes: {
    light: {
      primary: "#E19D40",
      secondary: "#E19C10"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
  }
};

const {
  Provider: AppContextProvider,
  Consumer: AppContextConsumer
} = React.createContext(defaultValue);

const AppContextHOC = WrapperComponent => {
  class Child extends React.Component {
    state = defaultValue;
    componentDidMount() {
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
    }
    componentWillUnmount() {
      console.log("unsubscribed");
      this.unsubscribe();
    }
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
          themes={this.context.themes}
        />
      );
    }
  }
  return Child;
};

export default AppContextHOC;

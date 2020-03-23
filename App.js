import React from "react";
import { createAppContainer } from "react-navigation";
import { AppNavigator } from "./navigations/LoginSwitchNav";
import store from "./redux/store";
import { Provider } from "react-redux";
import AppContextHOC from "./components/AppContext";
const AppContainer = createAppContainer(AppNavigator);
const AppWithContext = AppContextHOC(AppContainer);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithContext />
      </Provider>
    );
  }
}

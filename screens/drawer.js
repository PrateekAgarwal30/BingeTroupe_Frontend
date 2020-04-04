import React from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Switch,
  Image,
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
// import { getProfile, logOut, pushNotifToken } from "../redux/actions";
import _ from "lodash";
import { withAppContextConsumer } from "../components/AppContext";
import appEventUtil from "./../utils/eventUtil";
import Separator from "../components/common/Separator";
import DrawerButton from "../components/common/DrawerButton";
class Drawer extends React.Component {
  async componentDidMount() {
    try {
      const result = await this.registerForPushNotificationsAsync();
      if (result) {
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      return token;
    } catch (err) {
      return;
    }
  };
  _onThemeChange = async (x) => {
    if (x) {
      await AsyncStorage.setItem("theme", "dark");
    } else {
      await AsyncStorage.setItem("theme", "light");
    }
    appEventUtil.emit("theme_changed");
  };
  _onDrawerButtonClick = (screenId) => {
    this.props.navigation.navigate(screenId);
  };
  render() {
    const { defaultTheme, themes, currentActiveScreen } = this.props;
    return (
      <View
        style={{
          backgroundColor: themes.background,
          flex: 1,
          marginRight: 0,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://yt3.ggpht.com/a-/AOh14Gg0cCRgBBQ-kypFs0M6eIxKJgtBWskWCafv8LO7J1U=s88-c-k-c0xffffffff-no-rj-mo`,
            }}
            style={{
              height: 50,
              width: 50,
              alignSelf: "center",
              marginTop: 20,
              borderRadius: 10,
              marginBottom: 10,
            }}
            iterationCount={1}
            animation={"fadeIn"}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "black",
              alignSelf: "center",
            }}
          >
            {"Guest"}
          </Text>
          <Separator customHeight={2} customWidth={"80%"}/>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <DrawerButton
            label={"Home"}
            iconName={"home"}
            screenId={"Home"}
            onDrawerButtonClick={this._onDrawerButtonClick}
            currentActiveScreen={currentActiveScreen}
            themes={themes}
          />
          <Separator />
          <DrawerButton
            label={"Search"}
            iconName={"search"}
            screenId={"SearchScreen"}
            onDrawerButtonClick={this._onDrawerButtonClick}
            currentActiveScreen={currentActiveScreen}
            themes={themes}
          />
          <Separator />
          <DrawerButton
            label={"My Watchlist"}
            iconName={"bookmark"}
            screenId={"MyWatchList"}
            onDrawerButtonClick={this._onDrawerButtonClick}
            currentActiveScreen={currentActiveScreen}
            themes={themes}
          />
          <Separator />
          <DrawerButton
            label={"Setting"}
            iconName={"md-settings"}
            screenId={"Setting"}
            onDrawerButtonClick={this._onDrawerButtonClick}
            currentActiveScreen={currentActiveScreen}
            themes={themes}
          />
          <Separator />
          <View
            style={{
              flexDirection: "column",
              backgroundColor: themes.background,
              height: 60,
              justifyContent: "center",
              marginTop: 1,
              marginBottom: 2,
              alignItems: "center",
            }}
          >
            <Switch
              value={defaultTheme === "dark"}
              onValueChange={this._onThemeChange}
              thumbColor={themes.background}
            />
            <Text
              style={{
                fontSize: 11,
                fontWeight: "500",
                color: themes.primary,
              }}
            >
              {"Dark Mode"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#16235A",
    height: 80,
  },
  body: {
    marginTop: 20,
    flex: 1,
  },
  bodyContent: {
    alignItems: "center",
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    color: "#696969",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop: 20,
  },
  textWrapper: {
    fontSize: 18,
    marginLeft: 5,
    flex: 7,
    color: "white",
    fontWeight: "300",
  },
  iconStyle: {
    flex: 1,
    color: "white",
  },
  buttonWrapper: {
    marginBottom: 20,
    backgroundColor: "#16235A",
    borderRadius: 5,
  },
  buttonInsideView: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
});
const mapStateToProps = (state) => ({
  // user: state.user, profile: state.profile
});
const mapActionsToProps = {
  // getProfile: getProfile, logOut: logOut, pushNotificationToken: pushNotifToken
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(Drawer));

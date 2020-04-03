import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  Switch,
  Image
} from "react-native";
import { Content, Icon, Button } from "native-base";
// import Icon from '@expo/vector-icons/Ionicons';
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
// import { getProfile, logOut, pushNotifToken } from "../redux/actions";
import _ from "lodash";
import { withAppContextConsumer } from "../components/AppContext";
import appEventUtil from "./../utils/eventUtil";
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
  _onThemeChange = async x => {
    if (x) {
      await AsyncStorage.setItem("theme", "dark");
    } else {
      await AsyncStorage.setItem("theme", "light");
    }
    appEventUtil.emit("theme_changed");
  };
  render() {
    const { defaultTheme, themes } = this.props;
    return (
      <View
        style={{ backgroundColor: themes.background, flex: 1, marginRight: 0 }}
      >
        <View>
        <Image
          source={{
            uri: `https://yt3.ggpht.com/a-/AOh14Gg0cCRgBBQ-kypFs0M6eIxKJgtBWskWCafv8LO7J1U=s88-c-k-c0xffffffff-no-rj-mo`
          }}
          style={{
            height: 50,
            width: 50,
            alignSelf: "center",
            marginTop: 20,
            borderRadius: 10,marginBottom:10
          }}
          iterationCount={1}
          animation={"fadeIn"}
        />
        <Text style={{ fontSize: 16, fontWeight: "500",color:'black',alignSelf:'center' }}>{"Guest"}</Text>
        <View
                style={{
                  height: 1,
                  width: "95%",
                  backgroundColor: "#CED0CE",
                  alignSelf: "center"
                }}
              />
              </View>
        <View style={{flex:1}}></View>
        <Button
          style={{
            backgroundColor: themes.primary,
            elevation: 0,
            flexDirection: "column",
            minHeight: 60,
            marginVertical: 1
          }}
          onPress={() => {
            this.props.navigation.navigate("Home");
          }}
        >
          <Icon
            name="md-home"
            style={{
              fontSize: 24,
              color: themes.secondaryTextColor
            }}
          />
          <Text style={{ fontSize: 11, fontWeight: "500",color:themes.secondaryTextColor }}>{"Home"}</Text>
        </Button>
        <Button
          style={{
            backgroundColor: themes.primary,
            elevation: 0,
            flexDirection: "column",
            minHeight: 60,
            marginVertical: 1
          }}
          onPress={() => {
            this.props.navigation.navigate("SearchScreen");
          }}
        >
          <Icon
            name="search"
            style={{
              fontSize: 24,
              color: themes.secondaryTextColor
            }}
          />
          <Text style={{ fontSize: 11, fontWeight: "500",color:themes.secondaryTextColor }}>{"Search"}</Text>
        </Button>
        <Button
          style={{
            backgroundColor: themes.primary,
            elevation: 0,
            flexDirection: "column",
            minHeight: 60,
            marginVertical: 1
          }}
          onPress={() => {
            this.props.navigation.navigate("MyWatchList");
          }}
        >
          <Icon
            name="bookmark"
            style={{
              fontSize: 24,
              color: themes.secondaryTextColor
            }}
          />
          <Text style={{ fontSize: 11, fontWeight: "500",color:themes.secondaryTextColor }}>
            {"My Watchlist"}
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: themes.primary,
            elevation: 0,
            flexDirection: "column",
            minHeight: 60,
            marginTop:1,
            marginBottom:2
          }}
          onPress={() => {
            this.props.navigation.navigate("Setting");
          }}
        >
          <Icon
            name="md-settings"
            style={{
              fontSize: 24,
              color: themes.secondaryTextColor
            }}
          />
          <Text style={{ fontSize: 11, fontWeight: "500",color:themes.secondaryTextColor }}>{"Setting"}</Text>
        </Button>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: themes.primary,
            height: 60,
            justifyContent: "center",
            marginVertical: 1,
            alignItems: "center"
          }}
        >
          <Switch
            value={defaultTheme === "dark"}
            onValueChange={this._onThemeChange}
            thumbColor ={themes.background}
            trackColor ={"grey"}
            // disabled={true}
          />
          <Text style={{ fontSize: 11, fontWeight: "500",color:themes.secondaryTextColor }}>{"Dark Mode"}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#16235A",
    height: 80
  },
  body: {
    marginTop: 20,
    flex: 1
  },
  bodyContent: {
    alignItems: "center",
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  name: {
    fontSize: 20,
    color: "#696969",
    fontWeight: "600"
  },
  buttonContainer: {
    marginTop: 20
  },
  textWrapper: {
    fontSize: 18,
    marginLeft: 5,
    flex: 7,
    color: "white",
    fontWeight: "300"
  },
  iconStyle: {
    flex: 1,
    color: "white"
  },
  buttonWrapper: {
    marginBottom: 20,
    backgroundColor: "#16235A",
    borderRadius: 5
  },
  buttonInsideView: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
});
const mapStateToProps = state => ({
  // user: state.user,
  // profile: state.profile
});
const mapActionsToProps = {
  // getProfile: getProfile,
  // logOut: logOut,
  // pushNotificationToken: pushNotifToken
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(Drawer));

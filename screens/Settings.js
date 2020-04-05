import React from "react";
import { View, AsyncStorage, Text, Switch } from "react-native";
import { Header, Button, Left, Right, Body, Icon } from "native-base";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
// import * as Animatable from "react-native-animatable";
import _ from "lodash";
import appEventUtil from "./../utils/eventUtil";
import { withAppContextConsumer } from "../components/AppContext";
// import { getSearchSuggestions } from "../redux/actions";
import Separator from "../components/common/Separator";
class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      // this.props.getSearchSuggestions();
    } catch (err) {
      console.log(err.message);
    }
  }
  componentWillUnmount() {}
  _onThemeChange = async (x) => {
    if (x) {
      await AsyncStorage.setItem("theme", "dark");
    } else {
      await AsyncStorage.setItem("theme", "light");
    }
    appEventUtil.emit("theme_changed");
  };
  _onPushNotifClick = async (x) => {
    if (x) {
      await AsyncStorage.setItem("pushNotif", "false");
    } else {
      await AsyncStorage.setItem("pushNotif", "true");
    }
    appEventUtil.emit("pushNotif_changed");
  };
  render() {
    const { themes, defaultTheme, pushNotif } = this.props;
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: themes.background,
        }}
      >
        <LinearGradient
          colors={[themes.secondary, themes.primary]}
          style={{
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            elevation: 2,
            marginBottom: 2.5,
          }}
        >
          <Header transparent>
            <Left style={{ flex: 1 }}>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  name="ios-arrow-back"
                  style={{
                    color: themes.secondaryTextColor,
                    fontSize: 25,
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
            </Left>
            <Body
              style={{
                flex: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: themes.secondaryTextColor,
                  fontWeight: "bold",
                }}
              >
                {"Settings"}
              </Text>
            </Body>
            <Right style={{ flex: 1 }}></Right>
          </Header>
        </LinearGradient>
        <View
          style={{
            backgroundColor: themes.background,
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: themes.background,
              height: 60,
              justifyContent: "space-between",
              marginTop: 1,
              marginBottom: 2,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: themes.primaryTextColor,
              }}
            >
              {"Dark Mode"}
            </Text>
            <Switch
              value={defaultTheme === "dark"}
              onValueChange={this._onThemeChange}
              thumbColor={themes.background}
              tintColor={themes.primary}
              onTintColor={themes.primary}
            />
          </View>
          <Separator customHeight={2} />
          <View
            style={{
              flexDirection: "row",
              backgroundColor: themes.background,
              height: 60,
              justifyContent: "space-between",
              marginTop: 1,
              marginBottom: 2,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: themes.primaryTextColor,
              }}
            >
              {"Disable Push Notifications"}
            </Text>
            <Switch
              value={pushNotif === false}
              onValueChange={this._onPushNotifClick}
              thumbColor={themes.background}
              tintColor={themes.primary}
              onTintColor={themes.primary}
            />
          </View>
        </View>
      </View>
    );
  }
}
Settings.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => ({
  general: state.general,
});
const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(Settings));

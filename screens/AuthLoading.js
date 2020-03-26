import React from "react";
import { Alert, View, ActivityIndicator, Text } from "react-native";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import * as Font from "expo-font";

import { withAppContextConsumer } from "../components/AppContext";
import { getHomeConfig } from "../redux/actions";

class AuthLoading extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
  }
  componentDidMount() {
    this._loadFontAsync();
  }
  _loadFontAsync = async () => {
    Font.loadAsync({ diavlo: require("../assets/Diavlo.ttf") })
      .then(async () => {
        this.props.getHomeConfig();
      })
      .catch(() => {
        Alert.alert("Oops Something went wrong.\nPlease restart the App");
      });
  };
  render() {
    const themes = this.props.themes;
    if (this.props.general.homeConfig) {
      setTimeout(() => {
        this.props.navigation.navigate("AppDrawerNav");
      }, 300);
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: themes.primary,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <Animatable.Image
          style={{
            width: 100,
            height: 100
          }}
          source={require("./../assets/logo_transparent.png")}
          animation="zoomIn"
          iterationCount={1}
        /> */}
        <Animatable.Text
          animation="zoomIn"
          iterationCount={1}
          style={{
            fontSize: 32,
            // fontFamily: "diavlo",
            color: "white",
            marginBottom: 20
          }}
        >
          BingeTroupe
        </Animatable.Text>
        <View style={{ position: "absolute", bottom: 5, flexDirection: "row" }}>
          <ActivityIndicator
            size="small"
            hidesWhenStopped={true}
            animating={true}
            color={"white"}
          />
          <Animatable.Text
            animation="fadeIn"
            iterationCount={1}
            style={{
              color: "white",
              marginLeft: 10
            }}
          >
            Loading...
          </Animatable.Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({ general: state.general });
const mapActionsToProps = {
  getHomeConfig: getHomeConfig
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(AuthLoading));

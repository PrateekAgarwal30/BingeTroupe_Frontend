import React from "react";
import {
  View,
  AsyncStorage,
  Text,
  Dimensions,
  BackHandler
} from "react-native";
import { Header, Button, Left, Right, Body, Icon } from "native-base";
// import Icon from '@expo/vector-icons/Ionicons';
import { connect } from "react-redux";
import { getHomeConfig } from "../redux/actions";

import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";

import { withAppContextConsumer } from "./../components/AppContext";
import { Video } from "expo-av";
import { ScreenOrientation } from "expo";
import appEventUtil from "./../utils/eventUtil";
class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorViewOpen: false,
      searchText: "",
      searcToolVisiable: false,
      mealsWithQuantityFromCart: []
    };
    this.onCartUpdate = this.onCartUpdate;
  }

  async componentDidMount() {
    try {
    } catch (err) {
      console.log(err.message);
    }
  }
  _onBackPressed = async () => {
    console.log("_onBackPressed");
    await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  };
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this._onBackPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._onBackPressed);
  }

  render() {
    const { params } = this.props.navigation.state;
    const { themes } = this.props;
    const { width } = Dimensions.get("screen");
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: themes.background
        }}
      >
        <LinearGradient
          colors={[themes.secondary, themes.primary]}
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            elevation: 2
          }}
        >
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  name="arrow-back"
                  style={{ color: "white", fontSize: 25 }}
                />
              </Button>
            </Left>
            <Body>
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                {params.name}
              </Text>
            </Body>
            <Right />
          </Header>
        </LinearGradient>
        <Video
          source={{
            uri:
              "https://storage.googleapis.com/brunch-pvt-ltd.appspot.com/contentVideo/content_1584980855875"
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={{
            width: width - 10,
            height: (width * 9) / 16 - 5,
            borderRadius: 2,
            marginTop: 5,
            marginHorizontal: 5
          }}
          durationMillis={1000}
          isPlaying={true}
          useNativeControls={true}
          onFullscreenUpdate={async x => {
            // console.log("onFullscreenUpdate", x);
            if (x.fullscreenUpdate < 2) {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.Orientation.LANDSCAPE
              );
            } else {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.Orientation.PORTRAIT
              );
            }
          }}
          orientation={"landscape"}
          onLoadStart={() => {
            console.log("onLoadStart");
          }}
          ref={videoRef => (this.videoRef = videoRef)}
          usePoster={true}
          posterSource={{
            uri:
              "https://storage.googleapis.com/brunch-pvt-ltd.appspot.com/banners/sintel-poster.jpg"
          }}
        />
      </View>
    );
  }
}
DetailScreen.navigationOptions = {
  header: null
};

const mapStateToProps = state => ({
  general: state.general
});
const mapActionsToProps = {
  getHomeConfig: getHomeConfig
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(DetailScreen));

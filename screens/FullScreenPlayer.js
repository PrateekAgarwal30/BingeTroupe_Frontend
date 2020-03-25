import React from "react";
import { View, Dimensions, BackHandler } from "react-native";
import _ from "lodash";
import { withAppContextConsumer } from "../components/AppContext";
import { Video } from "expo-av";
import { ScreenOrientation } from "expo";
import { Button, Icon, Text } from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

class FullScreenPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: true,
      width: height,
      height: width
    };
    this.onCartUpdate = this.onCartUpdate;
  }
  async componentWillMount() {
    await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.LANDSCAPE);
    BackHandler.addEventListener("hardwareBackPress", this._onBackPressed);
  }

  async componentWillUnmount() {
    await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
    BackHandler.removeEventListener("hardwareBackPress", this._onBackPressed);
  }
  componentDidMount() {
    this.labelTimeout = setTimeout(() => {
      this.setState({ showHeader: false });
    }, 3000);
    // const { width, height } = Dimensions.get("screen");
    // this.setState({
    //   ...this.state,
    //   width: width,
    //   height: height
    // });
  }
  _showHeader = () => {
    if (this.state.showHeader) {
      clearTimeout(this.labelTimeout);
      this.labelTimeout = setTimeout(() => {
        this.setState({ showHeader: false });
      }, 3000);
    } else {
      this.setState({ showHeader: true });
      this.labelTimeout = setTimeout(() => {
        this.setState({ showHeader: false });
      }, 3000);
    }
  };
  _onBackPressed = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.Orientation.PORTRAIT
    ).then(() => {
      this.props.navigation.goBack();
    });
  };
  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height
    });
  };
  render() {
    // console.log(this.state);
    return (
      <TouchableHighlight
        onLayout-
        activeOpacity={1}
        onPress={this._showHeader}
      >
        <View>
          {this.state.showHeader && (
            <View
              style={{
                position: "absolute",
                top: 10,
                zIndex: 1,
                margin: 10,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Button transparent onPress={this._onBackPressed}>
                <Icon
                  name="arrow-back"
                  style={{ color: "white", fontSize: 25 }}
                />
              </Button>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  marginBottom: 2
                }}
              >
                {"Sintel"}
              </Text>
            </View>
          )}
          <Video
            source={{
              uri: `https://storage.googleapis.com/brunch-pvt-ltd.appspot.com/contentVideo/content_1585077238671`
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            style={{
              width: this.state.width,
              height: this.state.height
              // borderRadius: 2,
              // marginTop: 5,
              // marginHorizontal: 5
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
            // usePoster={true}
            // posterSource={{
            //   uri:
            //     "https://storage.googleapis.com/brunch-pvt-ltd.appspot.com/banners/sintel-poster.jpg"
            // }}
            onMagicTap={() => {
              console.log("onMagicTap");
            }}
            onTouchStart={() => {
              console.log("onTouchStart");
            }}
            // pointerEvents={()=>{console.log("pointerEvents");}}
          />
        </View>
      </TouchableHighlight>
    );
  }
}
FullScreenPlayer.navigationOptions = {
  header: null
};

export default withAppContextConsumer(FullScreenPlayer);

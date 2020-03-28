import React from "react";
import {
  View,
  AsyncStorage,
  Text,
  Dimensions,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { Header, Button, Left, Right, Body, Icon, Content } from "native-base";
// import Icon from '@expo/vector-icons/Ionicons';
import { connect } from "react-redux";
import { getContentById, clearContentById } from "../redux/actions";

import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";

import { withAppContextConsumer } from "./../components/AppContext";
import { Video } from "expo-av";
const { width } = Dimensions.get("screen");
import { ScreenOrientation } from "expo";
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
      const { params } = this.props.navigation.state;
      if (params && params.id) {
        this.props.getContentById(params.id);
      }
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
    this.props.clearContentById();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._onBackPressed);
  }

  render() {
    const { params } = this.props.navigation.state;
    const { themes } = this.props;
    const { detailPageContentLoading, detailPageContent } = this.props.general;
    if (detailPageContentLoading || !detailPageContent) {
      return <ActivityIndicator />;
    }
    const pageData = detailPageContent[0];
    // console.log(pageData);
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
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon
                  name="ios-arrow-back"
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
        <Content>
          <Video
            source={{
              uri: `${pageData.contentVideoUrl}`
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            style={{
              width: width - 10,
              height: (width * 9) / 16 - 5,
              borderRadius: 2,
              marginTop: 5,
              marginHorizontal: 5
            }}
            durationMillis={1000}
            // isPlaying={true}
            // useNativeControls={true}
            onFullscreenUpdate={async x => {
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
            // orientation={"landscape"}
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
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginLeft: 10,
              color: themes.primaryTextColor
            }}
          >
            {pageData.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              marginLeft: 10,
              color: themes.primaryTextColor
            }}
          >
            {pageData.subtitle}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              marginLeft: 10,
              marginTop: 10,
              color: themes.primaryTextColor
            }}
          >
            {pageData.body}
          </Text>
          <Button
            onPress={() => {
              this.props.navigation.navigate("FullScreenPlayer");
            }}
          >
            <Text>View</Text>
          </Button>
        </Content>
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
  getContentById: getContentById,
  clearContentById: clearContentById
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(DetailScreen));

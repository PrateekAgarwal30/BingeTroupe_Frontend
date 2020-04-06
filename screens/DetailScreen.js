import React from "react";
import {
  View,
  Text,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Header, Button, Left, Right, Body, Icon, Content } from "native-base";
// import Icon from '@expo/vector-icons/Ionicons';
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";
import { ScreenOrientation } from "expo";
import { getContentById, clearContentById } from "../redux/actions";
import { withAppContextConsumer } from "./../components/AppContext";
import getGenreTitle from "../utils/getGenreTitle";

const { width } = Dimensions.get("screen");

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInWatchList: true,
    };
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
    BackHandler.removeEventListener("hardwareBa ckPress", this._onBackPressed);
  }
  _handleWatchListClick = (isInWatchList) => {
    console.log("isInWatchList", isInWatchList);
    console.log(this.state);
    this.setState({ isInWatchList });
  };
  render() {
    const { params } = this.props.navigation.state;
    const { themes } = this.props;
    const { detailPageContentLoading, detailPageContent } = this.props.general;
    if (detailPageContentLoading || !detailPageContent) {
      return <ActivityIndicator />;
    }
    const pageData = detailPageContent[0];
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: themes.background,
        }}
      >
        <Content>
          <LinearGradient
            colors={["transparent", themes.background]}
            start={[0.0, 0.85]}
            style={{
              elevation: 2,
              height: (width * 12) / 16 - 5,
              zIndex: 1,
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
                  {params.name}
                </Text>
              </Body>
              <Right style={{ flex: 1 }}></Right>
            </Header>
          </LinearGradient>
          <ImageBackground
            style={{
              height: (width * 12) / 16 - 5,
              width: width,
              borderRadius: 3,
              marginRight: 20,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            source={{
              uri: `${pageData.contentTmbImgHorizontalUrl}`,
            }}
          >
            <View>
              <Button
                transparent
                rounded
                style={{
                  marginTop: 70,
                  height: "60%",
                  width: "100%",
                  justifyContent: "center",
                  zIndex: 2,
                }}
                onPress={() => {
                  this.props.navigation.navigate("FullScreenPlayer", {
                    videoUri: `${pageData.contentVideoUrl}`,
                  });
                }}
              >
                <Icon
                  name="md-play-circle"
                  style={{ color: themes.secondaryTextColor, fontSize: 70 }}
                />
              </Button>
            </View>
          </ImageBackground>
          <View style={{ marginTop: 20, marginHorizontal: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "500",
                  color: themes.primaryTextColor,
                  fontFamily: "helvetica",
                  maxWidth: "90%",
                }}
              >
                {pageData.name}
              </Text>
              {this.state.isInWatchList ? (
                <Animatable.View
                  animation="fadeIn"
                  iterationCount={1}
                  style={{ padding: 5 }}
                  duration={1200}
                >
                  <Icon
                    name="md-checkmark-circle-outline"
                    style={{
                      color: themes.primaryTextColor,
                      fontSize: 27,
                      textAlignVertical: "center",
                    }}
                    onPress={() => {
                      this._handleWatchListClick(false);
                    }}
                  />
                </Animatable.View>
              ) : (
                <Animatable.View
                  animation="fadeIn"
                  iterationCount={1}
                  style={{ padding: 5 }}
                  duration={1200}
                >
                  <Icon
                    name="md-add-circle-outline"
                    style={{
                      color: themes.primaryTextColor,
                      fontSize: 27,
                      textAlignVertical: "center",
                    }}
                    onPress={() => {
                      this._handleWatchListClick(true);
                    }}
                  />
                </Animatable.View>
              )}
            </View>

            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  color: themes.primaryTextColor,
                  fontFamily: "helvetica",
                }}
              >
                {_.join(
                  _.map(pageData.genres, (x) => getGenreTitle(x)),
                  " . "
                )}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                marginTop: 10,
                color: themes.primaryTextColor,
              }}
            >
              {pageData.body}
            </Text>
          </View>
        </Content>
      </View>
    );
  }
}
DetailScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => ({
  general: state.general,
});
const mapActionsToProps = {
  getContentById: getContentById,
  clearContentById: clearContentById,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(DetailScreen));

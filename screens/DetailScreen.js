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
import { getContentById, clearContentById } from "../redux/actions";

import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";

import { withAppContextConsumer } from "./../components/AppContext";
const { width } = Dimensions.get("screen");
import { ScreenOrientation } from "expo";
class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              height: (width * 11) / 16 - 5,
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
                  {"My WatchList"}
                </Text>
              </Body>
              <Right style={{ flex: 1 }}></Right>
            </Header>
          </LinearGradient>
          <ImageBackground
            style={{
              height: (width * 11) / 16 - 5,
              width: width,
              borderRadius: 3,
              marginRight: 20,
              position: "absolute",
              top: 0,
              left: 0,
            }}
            source={{
              uri: `${pageData.contentImageUrl}`,
            }}
          >
            <View>
              <Button
                transparent
                rounded
                style={{
                  marginTop: 70,
                  height: "70%",
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

          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              marginLeft: 10,
              color: themes.primaryTextColor,
            }}
          >
            {pageData.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              marginLeft: 10,
              color: themes.primaryTextColor,
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
              color: themes.primaryTextColor,
            }}
          >
            {pageData.body}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginHorizontal: 10,
            }}
          >
            <Button
              style={{
                backgroundColor: themes.primary,
                width: width / 3 - 10,
                height: 35,
                marginHorizontal: 2,
              }}
              onPress={() => {
                this.props.navigation.navigate("FullScreenPlayer", {
                  videoUri: `${pageData.contentVideoUrl}`,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: themes.secondaryTextColor,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                View
              </Text>
            </Button>
            <Button
              style={{
                backgroundColor: themes.primary,
                width: width / 3 - 10,
                height: 35,
                marginHorizontal: 2,
              }}
              onPress={() => {
                this.props.navigation.navigate("FullScreenPlayer", {
                  videoUri: `${pageData.contentVideoUrl}`,
                });
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: themes.secondaryTextColor,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                View
              </Text>
            </Button>
            <Button
              style={{
                backgroundColor: themes.primary,
                width: width / 3 - 10,
                height: 35,
                marginHorizontal: 2,
              }}
              onPress={() => {
                this.props.navigation.navigate("FullScreenPlayer", {
                  videoUri: `${pageData.contentVideoUrl}`,
                });
              }}
            >
              <Icon name={"heart"} style={{ fontSize: 16 }} />
              <Text
                style={{
                  fontSize: 12,
                  color: themes.secondaryTextColor,
                }}
              >
                View
              </Text>
            </Button>
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

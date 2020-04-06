import React from "react";
import {
  View,
  Text,
  Dimensions,
  // BackHandler,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from "react-native";
import {
  Header,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Content,
  Badge,
} from "native-base";
// import Icon from '@expo/vector-icons/Ionicons';
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";
// import { ScreenOrientation } from "expo";
import {
  getContentById,
  clearContentById,
  refreshWatchList,
} from "../redux/actions";
import { withAppContextConsumer } from "./../components/AppContext";
import { getGenreTitle, getCOntentDuration } from "../utils/generalFuctions";
import {
  SimilarContentListItem,
  SimilarContentHeaderComponent,
} from "../components/DetailPageComps";
const { width } = Dimensions.get("screen");

class DetailScreen extends React.Component {
  constructor(props) {
    super(props);
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
    // console.log("_onBackPressed");
    // await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  };
  componentWillMount() {
    // BackHandler.addEventListener("hardwareBackPress", this._onBackPressed);
    this.props.clearContentById();
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener("hardwareBa ckPress", this._onBackPressed);
  }
  _handleWatchListClick = (addToWL, contentId) => {
    if (addToWL) {
      this.props.refreshWatchList("add", contentId);
    } else {
      this.props.refreshWatchList("remove", contentId);
    }
  };
  _onSimilarContentClick = (data) => {
    // console.log("Cklicke");
    // this.props.navigation.goBack();
    this.props.navigation.navigate("DetailScreen", { ...data, key: data.id });
    this.props.getContentById(data.id);
  };
  render() {
    const { params } = this.props.navigation.state;
    const { themes } = this.props;
    const {
      detailPageContentLoading,
      detailPageContent,
      watchList,
      refreshWatchListLoading,
    } = this.props.general;
    const pageData = detailPageContent;
    const isInWatchList = _.indexOf(watchList, params.id) >= 0;
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: themes.background,
        }}
      >
        {detailPageContentLoading || !detailPageContent ? (
          <View>
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
                        color: themes.primaryTextColor,
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
                      color: themes.primaryTextColor,
                      fontWeight: "bold",
                    }}
                  >
                    {params.name}
                  </Text>
                </Body>
                <Right style={{ flex: 1 }}></Right>
              </Header>
            </LinearGradient>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
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
            <View style={{ flex: 1, marginHorizontal: 5 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
                {refreshWatchListLoading ? (
                  <Animatable.View
                    animation="fadeIn"
                    iterationCount={1}
                    style={{ padding: 5 }}
                    duration={1200}
                  >
                    <ActivityIndicator
                      color={themes.primaryTextColor}
                      style={{ paddingVertical: 4, paddingHorizontal: 3 }}
                    />
                  </Animatable.View>
                ) : isInWatchList ? (
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
                        this._handleWatchListClick(false, pageData._id);
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
                        this._handleWatchListClick(true, pageData._id);
                      }}
                    />
                  </Animatable.View>
                )}
              </View>
              <Content
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 0 }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
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

                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  {pageData.releaseDate && (
                    <Badge
                      style={{
                        justifyContent: "center",
                        marginRight: 5,
                        backgroundColor: themes.primary,
                      }}
                    >
                      <Text
                        style={{
                          color: themes.secondaryTextColor,
                          paddingHorizontal: 5,
                          fontWeight: "500",
                        }}
                      >
                        {"18+"}
                      </Text>
                    </Badge>
                  )}
                  {pageData.releaseDate && (
                    <Badge
                      style={{
                        justifyContent: "center",
                        marginRight: 5,
                        backgroundColor: themes.primary,
                      }}
                    >
                      <Text
                        style={{
                          color: themes.secondaryTextColor,
                          paddingHorizontal: 5,
                          fontWeight: "500",
                        }}
                      >
                        {new Date(pageData.releaseDate).getFullYear()}
                      </Text>
                    </Badge>
                  )}
                  {pageData.durationinMillSec && (
                    <Badge
                      style={{
                        justifyContent: "center",
                        marginRight: 5,
                        backgroundColor: themes.primary,
                      }}
                    >
                      <Text
                        style={{
                          color: themes.secondaryTextColor,
                          paddingHorizontal: 5,
                          fontWeight: "500",
                        }}
                      >
                        {getCOntentDuration(pageData.durationinMillSec)}
                      </Text>
                    </Badge>
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "400",
                    marginTop: 10,
                    color: themes.primaryTextColor,
                  }}
                >
                  {pageData.body}
                </Text>
                <FlatList
                  style={{ marginTop: 10 }}
                  data={pageData.similarContent || []}
                  keyExtractor={(itemData) => itemData._id}
                  renderItem={({ item }) => (
                    <SimilarContentListItem
                      contentData={item}
                      onContentClick={this._onSimilarContentClick}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  ListHeaderComponent={
                    <SimilarContentHeaderComponent themes={themes} />
                  }
                />
              </Content>
            </View>
          </View>
        )}
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
  refreshWatchList: refreshWatchList,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(DetailScreen));

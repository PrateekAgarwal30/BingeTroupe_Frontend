import React from "react";
import {
  // TextInput,
  View,
  // AsyncStorage,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Header, Button, Left, Right, Body, Icon } from "native-base";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
// import * as Animatable from "react-native-animatable";
import _ from "lodash";

import { withAppContextConsumer } from "../components/AppContext";
import { getWatchListDataFromServer, refreshWatchList } from "../redux/actions";
import Separator from "../components/common/Separator";
const { width } = Dimensions.get("screen");
class MyWatchList extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      this._refreshWatchList();
    } catch (err) {
      console.log(err.message);
    }
  }
  componentWillUnmount() {}
  _refreshWatchList = () => {
    const { watchList } = this.props.general;
    this.props.getWatchListDataFromServer(watchList);
  };
  _removeFromWatchList = async (contentId) => {
    await this.props.refreshWatchList("remove", contentId);
    await this._refreshWatchList();
  };
  render() {
    const { themes } = this.props;
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
                {"My WatchList"}
              </Text>
            </Body>
            <Right style={{ flex: 1 }}></Right>
          </Header>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginHorizontal: 10 }}
            data={this.props.general.wListContentData}
            showsVerticalScrollIndicator={false}
            refreshing={this.props.general.wListContentDataLoading}
            onRefresh={this._refreshWatchList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width: width - 25,
                  marginHorizontal: 2,
                  marginVertical: 5,
                }}
                activeOpacity={0.75}
                onPress={() => {
                  this.props.navigation.navigate("DetailScreen", {
                    id: item._id,
                    name: item.name,
                  });
                }}
              >
                <Animatable.Image
                  source={{
                    uri: `${item.contentTmbImgHorizontalUrl}`,
                  }}
                  style={{
                    height: 180,
                    width: "100%",
                    borderRadius: 10,
                  }}
                  iterationCount={1}
                  animation={"fadeIn"}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 5,
                    height: 30,
                    marginTop: -30,
                    padding: 0,
                    backgroundColor: `${themes.primary}aa`,
                    alignItems: "center",
                    borderBottomEndRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                >
                  <Button
                    transparent
                    style={{
                      elevation: 0,
                      flexDirection: "column",
                      margin: 0,
                      padding: 0,
                    }}
                    onPress={() => {
                      this._removeFromWatchList(item._id);
                    }}
                  >
                    <Icon
                      name={"ios-remove-circle-outline"}
                      style={{
                        fontSize: 27,
                        color: themes.background,
                      }}
                    />
                  </Button>
                  <Button
                    transparent
                    style={{
                      elevation: 0,
                      flexDirection: "column",
                      margin: 0,
                      padding: 0,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("DetailScreen", {
                        id: item._id,
                        name: item.name,
                      });
                    }}
                  >
                    <Icon
                      name={"ios-arrow-dropright"}
                      style={{
                        fontSize: 27,
                        color: themes.background,
                      }}
                    />
                  </Button>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item + index}
            ItemSeparatorComponent={() => <Separator customHeight={2} />}
            ListEmptyComponent={() => (
              <View>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 5,
                    color: themes.primaryTextColor,
                  }}
                >
                  {"Not Found"}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
MyWatchList.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => ({
  general: state.general,
});
const mapActionsToProps = {
  getWatchListDataFromServer: getWatchListDataFromServer,
  refreshWatchList: refreshWatchList,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(MyWatchList));

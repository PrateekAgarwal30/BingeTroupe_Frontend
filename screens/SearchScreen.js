import React from "react";
import {
  TextInput,
  View,
  AsyncStorage,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Header, Button, Left, Right, Body, Icon } from "native-base";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import _ from "lodash";

import { withAppContextConsumer } from "../components/AppContext";
import { getSearchSuggestions } from "../redux/actions";
import Separator from "../components/common/Separator";

class ScreenScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  async componentDidMount() {
    try {
      this.props.getSearchSuggestions();
    } catch (err) {
      console.log(err.message);
    }
  }
  componentWillUnmount() {}

  _SearchTextHandler = async (text) => {
    this.setState((prevState) => ({
      ...prevState,
      searchText: text,
    }));
    this.props.getSearchSuggestions(text);
  };

  _onSubmitEditing = async () => {
    const searchText = this.state.searchText || "";
    if (!searchText) {
      return;
    }
    let userSearchPref = await AsyncStorage.getItem("userSearchPref");
    if (!userSearchPref) {
      userSearchPref = "[]";
    }
    let searchResults = JSON.parse(userSearchPref);
    const findExistingEntry = _.indexOf(searchResults, searchText);
    if (findExistingEntry >= 0) {
      searchResults.splice(findExistingEntry, 1);
    }
    searchResults.unshift(searchText);
    searchResults = searchResults.slice(0, 15);
    await AsyncStorage.setItem("userSearchPref", JSON.stringify(searchResults));
  };
  async componentWillReceiveProps(props) {}

  _onSearchSelection = async (data) => {
    this.props.navigation.navigate("DetailScreen", data);
    const searchText = data.name;
    if (!searchText) {
      return;
    }
    let userSearchPref = await AsyncStorage.getItem("userSearchPref");
    if (!userSearchPref) {
      userSearchPref = "[]";
    }
    let searchResults = JSON.parse(userSearchPref);
    const findExistingEntry = _.indexOf(searchResults, searchText);
    if (findExistingEntry >= 0) {
      searchResults.splice(findExistingEntry, 1);
    }
    searchResults.unshift(searchText);
    searchResults = searchResults.slice(0, 15);
    await AsyncStorage.setItem("userSearchPref", JSON.stringify(searchResults));
  };

  _onRemoveClick = async (removeText) => {
    console.log("_onRemoveClick called");
    const searchResults = this.props.general.searchSuggestions || [];
    const findExistingEntry = _.indexOf(searchResults, removeText);
    if (findExistingEntry >= 0) {
      searchResults.splice(findExistingEntry, 1);
      await AsyncStorage.setItem(
        "userSearchPref",
        JSON.stringify(searchResults)
      );
      this.props.getSearchSuggestions(this.state.searchText);
    }
  };
  _onHistorySelection = async (searchText) => {
    this.setState({ searchText });
    this.props.getSearchSuggestions(searchText);
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
                flex: 11,
              }}
            >
              <Animatable.View
                style={{
                  flexDirection: "row",
                  width: "90%",
                  justifyContent: "center",
                  alignSelf: "center",
                  backgroundColor: themes.background,
                  marginBottom: 5,
                  borderRadius: 10,
                }}
                animation={"zoomIn"}
                duration={200}
              >
                <TextInput
                  style={{
                    padding: 8,
                    display: "flex",
                    fontSize: 15,
                    width: "84%",
                    color: themes.primaryTextColor,
                  }}
                  maxLength={25}
                  placeholder="Search Movie, TV Series..."
                  value={this.state.searchText}
                  onChangeText={this._SearchTextHandler}
                  onSubmitEditing={this._onSubmitEditing}
                />
                {this.state.searchText ? (
                  <Icon
                    name="md-close"
                    size={20}
                    style={{
                      alignSelf: "center",
                      marginRight: 15,
                      color: themes.primaryTextColor,
                    }}
                    onPress={() => {
                      this._SearchTextHandler("");
                    }}
                  />
                ) : (
                  <Icon
                    name="ios-mic"
                    size={20}
                    style={{
                      alignSelf: "center",
                      marginRight: 15,
                      color: themes.primaryTextColor,
                    }}
                  />
                )}
              </Animatable.View>
            </Body>
            <Right style={{ flex: 0 }}></Right>
          </Header>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.props.general.searchSuggestions}
            showsVerticalScrollIndicator={false}
            refreshing={this.props.general.searchSuggestionsLoading}
            onRefresh={() => {
              this.props.getSearchSuggestions(this.state.searchText);
            }}
            renderItem={({ item }) => {
              if (typeof item === "object") {
                return (
                  <Button
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 10,
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginVertical: 2,
                      backgroundColor: themes.background,
                      elevation: 0,
                    }}
                    onPress={() =>
                      this._onSearchSelection({ id: item._id, name: item.name })
                    }
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={{
                          height: 42.5,
                          width: 61,
                          borderRadius: 3,
                          marginRight: 20,
                        }}
                        source={{ uri: item.contentTmbImgHorizontalUrl }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            color: themes.primaryTextColor,
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: themes.primaryTextColor,
                          }}
                        >
                          {_.join(item.genres, ", ")}
                        </Text>
                      </View>
                    </View>
                    <Icon
                      name="ios-navigate"
                      style={{
                        transform: [{ rotate: "45 deg" }],
                        fontSize: 20,
                        color: themes.primaryTextColor,
                      }}
                    />
                  </Button>
                );
              } else {
                return (
                  <Button
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 20,
                      paddingRight: 10,
                      paddingTop: 10,
                      paddingBottom: 10,
                      marginVertical: 2,
                      backgroundColor: themes.background,
                      elevation: 0,
                    }}
                    onPress={() => this._onHistorySelection(item)}
                  >
                    <Text
                      style={{ fontSize: 16, color: themes.primaryTextColor }}
                    >
                      {item}
                    </Text>
                    <Icon
                      name="close-circle-outline"
                      style={{ fontSize: 20, color: themes.primaryTextColor }}
                      onPress={() => {
                        this._onRemoveClick(item);
                      }}
                    />
                  </Button>
                );
              }
            }}
            keyExtractor={(item, index) => item + index}
            ItemSeparatorComponent={() => <Separator />}
            ListHeaderComponent={() => (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    marginHorizontal: 20,
                    marginVertical: 10,
                    color: themes.primaryTextColor,
                  }}
                >
                  {this.state.searchText ? "Search Results" : "Search History"}
                </Text>
                <Separator />
              </View>
            )}
            ListEmptyComponent={() => (
              <View>
                <Text
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 5,
                    color: themes.primaryTextColor,
                  }}
                >
                  {this.state.searchText ? "No Suggestion" : "Not Found"}
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
ScreenScreen.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => ({
  general: state.general,
});
const mapActionsToProps = {
  getSearchSuggestions: getSearchSuggestions,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(ScreenScreen));

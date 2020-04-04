import React from "react";
import {
  // TextInput,
  View,
  // AsyncStorage,
  Text,
  // FlatList,
  // Image
} from "react-native";
import { Header, Button, Left, Right, Body, Icon } from "native-base";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
// import * as Animatable from "react-native-animatable";
import _ from "lodash";

import { withAppContextConsumer } from "../components/AppContext";
// import { getSearchSuggestions } from "../redux/actions";

class MyWatchList extends React.Component {
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
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
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
        <View style={{ flex: 1 }}></View>
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
const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(MyWatchList));

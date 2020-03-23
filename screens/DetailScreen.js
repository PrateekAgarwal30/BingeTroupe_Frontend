import React from "react";
import { TextInput, View, AsyncStorage, SectionList, Text } from "react-native";
import { Header, Button, Left, Right, Body, Card, Icon } from "native-base";
// import Icon from '@expo/vector-icons/Ionicons';
import { connect } from "react-redux";
import { getHomeConfig } from "../redux/actions";

import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
// import appEventEmitter from "../utils/eventUtil";
import _ from "lodash";

import { withAppContextConsumer } from "./../components/AppContext";

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
  toogleColorViewOpen = () => {
    this.setState(prevSate => ({
      colorViewOpen: !prevSate.colorViewOpen
    }));
  };

  async componentDidMount() {
    try {
      // this.props.getProfile();
      // this.props.getMeals();
    } catch (err) {
      console.log(err.message);
    }
    // appEventEmitter.on("cartUpdated", this.onCartUpdate);
    // Notifications.addListener(payload => console.log(JSON.stringify(payload)));
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
    // appEventEmitter.removeEventListener("cartUpdated", this.onCartUpdate);
  }
  _SearchTextHandler = text => {
    this.setState(prevState => ({
      ...prevState,
      searchText: text
    }));
  };
  updateMealsWithQuantityFromCart = async mealsProps => {
    const cartAsync = (await AsyncStorage.getItem("cart")) || "[]";
    const cart = JSON.parse(cartAsync);
    _.map(mealsProps, mealItem => {
      let cartItem = _.find(cart, _.matchesProperty("mealId", mealItem._id));
      mealItem.quantity = cartItem ? cartItem.quantity : 0;
    });
    this.setState(prevState => ({
      ...prevState,
      mealsWithQuantityFromCart: mealsProps
    }));
  };
  async componentWillReceiveProps(props) {
    let currenMealProps = _.get(this, "props.user.meals", []) || [];
    let newMealProps = _.get(props, "user.meals", []) || [];
    if (currenMealProps !== newMealProps) {
      await this.updateMealsWithQuantityFromCart(newMealProps);
    }
  }
  onCartUpdate = async () => {
    const mealsProps = _.get(this, "props.user.meals", []) || [];
    await this.updateMealsWithQuantityFromCart(mealsProps);
  };
  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
    const { themes } = this.props;
    return (
      <View
        style={{
          flex: 1,
          zIndex: 0,
          backgroundColor: "#EDEEF1"
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

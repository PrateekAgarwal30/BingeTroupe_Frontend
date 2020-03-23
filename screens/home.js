import React from "react";
import { Text, TextInput, View, FlatList, AsyncStorage } from "react-native";
import { Header, Button, Left, Right, Body, Card, Icon } from "native-base";
// import Icon from '@expo/vector-icons/Ionicons';
import { connect } from "react-redux";
import { getProfile, getMeals } from "../redux/actions";
import { withAppContextConsumer } from "./../components/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
// import appEventEmitter from "../utils/eventUtil";
import _ from "lodash";
class Home extends React.Component {
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
    // const { isLoading } = this.props.user;
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
          colors={[themes["light"].secondary, themes["light"].primary]}
          style={{
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            elevation: 2,
            marginBottom: 5
          }}
        >
          <Header transparent>
            <Left style={{ flex: 1 }}>
              <Button
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45
                }}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  name="menu"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 25,
                    margin: 0,
                    padding: 0
                  }}
                />
              </Button>
            </Left>
            <Body
              style={{
                flex: 6
              }}
            ></Body>
            <Right style={{ flex: 2 }}>
              <Button
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45
                }}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  name="heart"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 25,
                    margin: 0,
                    padding: 0
                  }}
                />
              </Button>
              <Button
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45
                }}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    searcToolVisiable: !this.state.searcToolVisiable
                  })
                }
              >
                <Icon
                  name="search"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 25,
                    margin: 0,
                    padding: 0
                  }}
                />
              </Button>
              <Button
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45
                }}
                onPress={() => this.props.navigation.navigate("Cart")}
              >
                <Icon
                  name="cart"
                  style={{
                    color: "#E1E0E2",
                    fontSize: 25,
                    margin: 0,
                    padding: 0
                  }}
                />
              </Button>
            </Right>
          </Header>
          {this.state.searcToolVisiable ? (
            <Animatable.View
              style={{
                flexDirection: "row",
                width: "90%",
                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: "#E1E0E2",
                marginBottom: 5,
                borderRadius: 10
              }}
              animation={"zoomIn"}
              duration={200}
            >
              <TextInput
                style={{
                  padding: 8,
                  display: "flex",
                  fontSize: 15,
                  width: "88%"
                }}
                maxLength={25}
                placeholder="Search Meal Box..."
                value={this.state.searchText}
                onChangeText={this._SearchTextHandler}
              />
              {this.state.searchText ? (
                <Icon
                  name="md-close"
                  size={20}
                  color="#000"
                  style={{
                    alignSelf: "center",
                    marginRight: 15
                  }}
                  onPress={() => {
                    this._SearchTextHandler("");
                  }}
                />
              ) : (
                <Icon
                  name="ios-search"
                  size={20}
                  color="#000"
                  style={{
                    alignSelf: "center",
                    marginRight: 10
                  }}
                />
              )}
            </Animatable.View>
          ) : null}
        </LinearGradient>
      </View>
    );
  }
}
Home.navigationOptions = {
  header: null
};

const mapStateToProps = state => ({ 
  // user: state.user, 
  // profile: state.profile 
});
const mapActionsToProps = {
  // getProfile: getProfile,
  // getMeals: getMeals
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(Home));

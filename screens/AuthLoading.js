import React from "react";
import { AsyncStorage, Alert, View, ActivityIndicator } from "react-native";
// import CustomActivityIndicator from "../components/CustomActivityIndicator";
import * as Animatable from "react-native-animatable";
import * as Font from "expo-font";
import { withAppContextConsumer } from "../components/AppContext";
class AuthLoading extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
  }
  componentDidMount() {
    this._loadFontAsync();
  }
  _loadFontAsync = async () => {
    Font.loadAsync({ diavlo: require("../assets/Diavlo.ttf") })
      .then(async () => {
        console.log("Font Loaded");
        // const authToken = await AsyncStorage.getItem("authToken");

        // if (authToken) {
        //   setTimeout(() => {
        //     this.props.navigation.navigate("AppDrawerNav");
        //   }, 1000);
        // } else {
        //   setTimeout(() => {
        //     this.props.navigation.navigate("AuthStack");
        //   }, 1000);
        // }
        setTimeout(() => {
          this.props.navigation.navigate("AppDrawerNav");
        }, 1000);
      })
      .catch(() => {
        Alert.alert("Oops Something went wrong.\nPlease restart the App");
      });
  };
  render() {
    const themes = this.props.themes;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: themes["light"].primary,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <Animatable.Image
          style={{
            width: 100,
            height: 100
          }}
          source={require("./../assets/logo_transparent.png")}
          animation="zoomIn"
          iterationCount={1}
        /> */}
        <Animatable.Text
          animation="zoomIn"
          iterationCount={1}
          style={{
            fontSize: 32,
            // fontFamily: "diavlo",
            color: "white",
            marginBottom: 20
          }}
        >
          BingeTroupe
        </Animatable.Text>
        <ActivityIndicator
          size="large"
          hidesWhenStopped={true}
          animating={true}
          color={"white"}
        />
      </View>
    );
  }
}

export default withAppContextConsumer(AuthLoading);

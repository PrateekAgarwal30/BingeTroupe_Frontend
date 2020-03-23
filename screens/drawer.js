import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Content,Icon } from "native-base";
// import Icon from '@expo/vector-icons/Ionicons';
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { getProfile, logOut, pushNotifToken } from "../redux/actions";
import _ from "lodash";
// import CustomImagePicker from "../components/CustomImagePicker";
class Drawer extends React.Component {
  async componentDidMount() {
    try {
      const result = await this.registerForPushNotificationsAsync();
      if (result) {
        this.props.pushNotificationToken(result);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      return token;
    } catch (err) {
      return;
    }
  };
  render() {
    const imageUrl =
      _.get(this.props, "profile.details.userImageUrl", "") || "";
    const imageThumbnail =
      _.get(this.props, "profile.details.userImageThumbnail", "") || "";
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        {/* <View>
          <CustomImagePicker
            disabled={true}
            imageUrl={imageUrl ? `${imageUrl}` : null}
            imageThumbnail={imageThumbnail ? `${imageThumbnail}` : null}
          />
        </View> */}
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>
              {_.get(
                this.props,
                "profile.details.firstName",
                this.props.profile.email
              ) || "Guest"}
            </Text>
          </View>
          <Content padder style={styles.buttonContainer1}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <View style={styles.buttonInsideView}>
                <Icon name="ios-person" style={styles.iconStyle} />
                <Text style={styles.textWrapper}>Profile</Text>
                <Icon name="ios-arrow-forward" style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => this.props.navigation.navigate("ManageAddress")}
            >
              <View style={styles.buttonInsideView}>
                <Icon name="map" style={styles.iconStyle} />
                <Text style={styles.textWrapper}>Manage Addresses</Text>
                <Icon name="ios-arrow-forward" style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => this.props.navigation.navigate("Wallet")}
            >
              <View style={styles.buttonInsideView}>
                <Icon name="wallet" style={styles.iconStyle} />
                <Text style={styles.textWrapper}>Wallet</Text>
                <Icon name="ios-arrow-forward" style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => this.props.navigation.navigate("ManageOrders")}
            >
              <View style={styles.buttonInsideView}>
                <Icon name="list-box" style={styles.iconStyle} />
                <Text style={styles.textWrapper}>Manage Orders</Text>
                <Icon name="ios-arrow-forward" style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => Alert.alert("Clicked")}
            >
              <View style={styles.buttonInsideView}>
                <Icon name="heart" style={styles.iconStyle} />
                <Text style={styles.textWrapper}>Favourite</Text>
                <Icon name="ios-arrow-forward" style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => this.props.navigation.navigate("ChangePassword")}
            >
              <View style={styles.buttonInsideView}>
                <Icon name="keypad" style={styles.iconStyle} />
                <Text style={styles.textWrapper}>Change Password</Text>
                <Icon name="ios-arrow-forward" style={styles.iconStyle} />
              </View>
            </TouchableOpacity>
          </Content>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#16235A",
    height: 80
  },
  body: {
    marginTop: 20,
    flex: 1
  },
  bodyContent: {
    alignItems: "center",
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
  name: {
    fontSize: 20,
    color: "#696969",
    fontWeight: "600"
  },
  buttonContainer: {
    marginTop: 20
  },
  textWrapper: {
    fontSize: 18,
    marginLeft: 5,
    flex: 7,
    color: "white",
    fontWeight: "300"
  },
  iconStyle: {
    flex: 1,
    color: "white"
  },
  buttonWrapper: {
    marginBottom: 20,
    backgroundColor: "#16235A",
    borderRadius: 5
  },
  buttonInsideView: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  }
});
const mapStateToProps = state => ({ user: state.user, profile: state.profile });
const mapActionsToProps = {
  getProfile: getProfile,
  logOut: logOut,
  pushNotificationToken: pushNotifToken
};
export default connect(mapStateToProps, mapActionsToProps)(Drawer);

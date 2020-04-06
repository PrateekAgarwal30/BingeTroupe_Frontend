import React from "react";
import { View, SectionList } from "react-native";
import { Header, Button, Left, Right, Body, Icon } from "native-base";
import { connect } from "react-redux";
import { getHomeConfig, refreshWatchList } from "../redux/actions";

import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";

import { withAppContextConsumer } from "./../components/AppContext";
import BannerCarousel from "./../components/BannerCarousel";
import {
  GenreHeaderComponent,
  RenderSectionListItem,
} from "../components/HomeSectionListComp";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorViewOpen: false,
      searchText: "",
      searcToolVisiable: false,
      mealsWithQuantityFromCart: [],
    };
    this.onCartUpdate = this.onCartUpdate;
  }
  toogleColorViewOpen = () => {
    this.setState((prevSate) => ({
      colorViewOpen: !prevSate.colorViewOpen,
    }));
  };

  async componentDidMount() {
    try {
      this.props.refreshWatchList("refresh");
    } catch (err) {
      console.log(err.message);
    }
  }
  componentWillUnmount() {}

  _onContentClick = (data) => {
    this.props.navigation.navigate("DetailScreen", data);
  };
  render() {
    // const { isLoading } = this.props.user;
    const { themes } = this.props;
    // console.log(this.props.general.homeConfig.genresData);
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
                rounded
                transparent
                style={{
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                  minWidth: 45,
                }}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  name="menu"
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
                flex: 6,
              }}
            ></Body>
            <Right style={{ flex: 2 }}>
              <Button
                transparent
                rounded
                style={{
                  maxWidth: 45,
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                }}
                onPress={() => this.props.navigation.navigate("MyWatchList")}
              >
                <Icon
                  name="bookmark"
                  style={{
                    color: themes.secondaryTextColor,
                    fontSize: 25,
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
              <Button
                transparent
                rounded
                style={{
                  maxWidth: 45,
                  marginTop: 5,
                  marginLeft: 2.5,
                  paddingLeft: 12.5,
                  paddingRight: 12.5,
                }}
                onPress={() => this.props.navigation.navigate("SearchScreen")}
              >
                <Icon
                  name="search"
                  style={{
                    color: themes.secondaryTextColor,
                    fontSize: 25,
                    margin: 0,
                    padding: 0,
                  }}
                />
              </Button>
            </Right>
          </Header>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <SectionList
            sections={this.props.general.homeConfig.genresData || []}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <RenderSectionListItem
                item={item}
                onContentClick={this._onContentClick}
              />
            )}
            stickySectionHeadersEnabled={true}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            onRefresh={() => this.props.getHomeConfig()}
            refreshing={this.props.general.homeConfigLoading || false}
            renderSectionHeader={({ section: { title, genreId, count } }) => (
              <GenreHeaderComponent
                headerData={title}
                genreId={genreId}
                count={count}
                themes={themes}
              />
            )}
            ListHeaderComponent={
              <BannerCarousel
                bannerData={
                  _.get(this.props, "general.homeConfig.banners", []) || []
                }
                themes={themes}
              />
            }
          />
        </View>
      </View>
    );
  }
}
Home.navigationOptions = {
  header: null,
};

const mapStateToProps = (state) => ({
  general: state.general,
});
const mapActionsToProps = {
  getHomeConfig: getHomeConfig,
  refreshWatchList: refreshWatchList,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withAppContextConsumer(Home));

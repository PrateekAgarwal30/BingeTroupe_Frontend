import React from "react";
import { Text, View, Platform } from "react-native";
import Carousel, {
  ParallaxImage,
  Pagination
} from "react-native-snap-carousel";
import { Dimensions, StyleSheet } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

export default class MyCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: props.bannerData
    };
  }
  _renderItem = themes => ({ item, index }, parallaxProps) => {
    return (
      <View style={styles(themes).item}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles(themes).imageContainer}
          style={styles(themes).image}
          parallaxFactor={0.0}
          {...parallaxProps}
        />
        <Text style={styles(themes).title} numberOfLines={1}>
          {/* {item.title} */}
        </Text>
      </View>
    );
  };
  render() {
    const { entries, activeSlide } = this.state;
    const { themes } = this.props;
    return (
      <View>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          data={this.state.entries}
          renderItem={this._renderItem(themes)}
          hasParallaxImages={true}
          onSnapToItem={index =>
            this.setState({ ...this.state, activeSlide: index })
          }
          containerCustomStyle={{ marginBottom: -20 }}
        />
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide || 0}
          containerStyle={{
            paddingTop: 5,
            paddingBottom: 2
          }}
          dotStyle={styles(themes).dotStyle}
          inactiveDotStyle={styles(themes).inactiveDotStyle}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.5}
        />
      </View>
    );
  }
}

const styles = themes =>
  StyleSheet.create({
    item: {
      width: screenWidth,
      height: 200
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: "#E1E0E2",
      borderRadius: 8,
      elevation: 2,
      width: screenWidth - 12,
      alignSelf: "center"
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: "cover"
    },
    dotStyle: {
      width: 8,
      height: 8,
      borderRadius: 5,
      marginHorizontal: -10,
      backgroundColor: themes.primary
    },
    inactiveDotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: -10,
      borderWidth: 2,
      backgroundColor: "transparent",
      borderColor: themes.primary
    }
  });

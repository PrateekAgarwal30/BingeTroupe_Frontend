import React from "react";
import * as Animatable from "react-native-animatable";
import moment from "moment";
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  FlatList
} from "react-native";
const styles = StyleSheet.create({
  header: {
    // backgroundColor: "#EDEEF1",
    paddingVertical: 2.5,
    borderRadius: 5
  },
  headerText: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 10
  },
  noTxnText: {
    fontSize: 20,
    paddingVertical: 10,
    alignSelf: "center"
  }
});

export const ContentListItem = ({ contentData, onContentClick }) => {
  // console.log(contentData.contentThumbnailUrl);
  return (
    <View
      style={{
        backgroundColor: "white",
        marginVertical: 2.5,
        marginHorizontal: 2.5,
        borderRadius: 10
      }}
    >
      <Animatable.View animation="fadeIn" iterationCount={1}>
        <TouchableHighlight
          onPress={() => {
            onContentClick({ id: contentData._id, name: contentData.name });
          }}
          underlayColor={"#E1E0E2"}
          style={{
            borderRadius: 10,
            width: "100%"
          }}
        >
          <View>
            <Animatable.Image
              source={{ uri: `${contentData.contentThumbnailUrl}` }}
              style={{ height: 188, width: 131, borderRadius: 10 }}
              iterationCount={1}
              animation={"fadeIn"}
            />
            <Text
              style={{
                color: "grey",
                fontSize: 13,
                marginLeft: 10,
                fontWeight: "bold"
              }}
            >
              {contentData.name}
            </Text>
          </View>
        </TouchableHighlight>
      </Animatable.View>
    </View>
  );
};

export const NoTxnFound = () => {
  return (
    <Animatable.View animation="fadeInDown" iterationCount={1}>
      <Text style={styles.noTxnText}>No Transactions Found</Text>
    </Animatable.View>
  );
};
export const GenreHeaderComponent = ({ headerData }) => {
  return (
    <Animatable.View
      animation="fadeIn"
      iterationCount={1}
      style={styles.header}
    >
      <Text style={styles.headerText}>{headerData}</Text>
    </Animatable.View>
  );
};

export const RenderSectionListItem = ({ item, onContentClick }) => {
  return (
    <FlatList
      data={item.flatListData}
      keyExtractor={itemData => itemData._id}
      renderItem={({ item }) => (
        <ContentListItem contentData={item} onContentClick={onContentClick} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

import React from "react";
import * as Animatable from "react-native-animatable";
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Icon } from "native-base";

const styles = (themes) =>
  StyleSheet.create({
    header: {
      backgroundColor: themes.background,
      paddingVertical: 2.5,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerText: {
      fontSize: 20,
      fontWeight: "400",
      marginLeft: 10,
      color: themes.primaryTextColor,
    },
    noTxnText: {
      fontSize: 20,
      paddingVertical: 10,
      alignSelf: "center",
    },
  });

export const ContentListItem = ({ contentData, onContentClick }) => {
  const title = contentData.name;
  return (
    <View
      style={{
        // backgroundColor: "white",
        marginVertical: 2.5,
        marginHorizontal: 2.5,
        borderRadius: 10,
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
            width: "100%",
          }}
        >
          <View>
            <Animatable.Image
              source={{ uri: `${contentData.contentTmbImgVeritcalUrl}` }}
              style={{ height: 188, width: 131, borderRadius: 10 }}
              iterationCount={1}
              animation={"fadeIn"}
            />
            <Text
              style={{
                color: "grey",
                fontSize: 13,
                marginLeft: 2,
                fontWeight: "bold",
                width: 100,
              }}
              numberOfLines={2}
            >
              {title}
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
export const GenreHeaderComponent = ({
  headerData,
  genreId,
  themes,
  count,
}) => {
  return (
    <Animatable.View
      animation="fadeIn"
      iterationCount={1}
      style={styles(themes).header}
    >
      <Text style={styles(themes).headerText}>{headerData}</Text>
      {count > 3 && (
        <TouchableOpacity
          style={{
            backgroundColor: themes.backgroundColor,
            marginRight: 5,
            flexDirection: "row",
          }}
          onPress={() => Alert.alert("Work In Progress!")}
        >
          <Text style={{ color: "black", fontWeight: "bold", marginRight: 4 }}>
            {"More"}
          </Text>
          <Icon name="ios-arrow-forward" style={{ fontSize: 20 }} />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export const RenderSectionListItem = ({ item, onContentClick }) => {
  return (
    <FlatList
      data={item.flatListData}
      keyExtractor={(itemData) => itemData._id}
      renderItem={({ item }) => (
        <ContentListItem contentData={item} onContentClick={onContentClick} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

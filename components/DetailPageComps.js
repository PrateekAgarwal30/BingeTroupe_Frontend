import React from "react";
import * as Animatable from "react-native-animatable";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
import Separator from "../components/common/Separator";
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
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 2,
      color: themes.primaryTextColor,
    },
    noTxnText: {
      fontSize: 20,
      paddingVertical: 10,
      alignSelf: "center",
    },
  });

export const SimilarContentListItem = ({ contentData, onContentClick }) => {
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
        <TouchableOpacity
          onPress={() => {
            onContentClick({ id: contentData._id, name: contentData.name });
          }}
          underlayColor={"red"}
          style={{
            borderRadius: 10,
            width: "100%",
          }}
        >
          <Animatable.Image
            source={{ uri: `${contentData.contentTmbImgHorizontalUrl}` }}
            style={{ height: 131, width: width / 2 - 10, borderRadius: 10 }}
            iterationCount={1}
            animation={"fadeIn"}
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export const SimilarContentHeaderComponent = ({ themes }) => {
  return (
    <Animatable.View
      animation="fadeIn"
      iterationCount={1}
      style={[styles(themes).header, { justifyContent: "space-between" }]}
    >
      <Text style={styles(themes).headerText}>{"MORE LIKE THIS"}</Text>
      <View style={{ flex: 1, alignItems: "center", marginLeft: 2 }}>
        <Separator
          customHeight={1.5}
          customWidth={"95%"}
          customStyle={{ backgroundColor: themes.primary }}
        />
      </View>
    </Animatable.View>
  );
};

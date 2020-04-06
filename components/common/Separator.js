import React from "react";
import { View } from "react-native";

export default ({ customWidth, customHeight, customStyle }) => (
  <View
    style={[
      {
        height: customHeight ? customHeight : 1,
        width: customWidth ? customWidth : "95%",
        backgroundColor: "#CED0CE",
        alignSelf: "center",
      },
      customStyle || {},
    ]}
  />
);

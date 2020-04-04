import React from "react";
import { Text } from "react-native";
import { Icon, Button } from "native-base";

export default ({
  themes,
  label,
  screenId,
  iconName,
  currentActiveScreen,
  onDrawerButtonClick,
}) => (
  <Button
    style={{
      backgroundColor: themes.background,
      elevation: 0,
      flexDirection: "column",
      minHeight: 60,
      marginVertical: 1,
      borderRightWidth: currentActiveScreen === screenId ? 4 : 0,
      borderColor: themes.primary,
    }}
    onPress={() => {
      onDrawerButtonClick(screenId);
    }}
  >
    <Icon
      name={iconName}
      style={{
        fontSize: 24,
        color: themes.primary,
      }}
    />
    <Text
      style={{
        fontSize: 11,
        fontWeight: "500",
        color: themes.primary,
      }}
    >
      {label}
    </Text>
  </Button>
);

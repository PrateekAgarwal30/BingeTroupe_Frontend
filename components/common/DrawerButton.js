import React from "react";
import { Text } from "react-native";
import { Icon, Button } from "native-base";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default ({
  themes,
  label,
  screenId,
  iconName,
  currentActiveScreen,
  onDrawerButtonClick,
  isAntDesignIcon,
  isMaterialCommunityIcons,
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
    {isAntDesignIcon ? (
      <AntDesignIcon
        name={iconName}
        style={{
          fontSize: 24,
          color: themes.primary,
        }}
      />
    ) : null}
    {isMaterialCommunityIcons ? (
      <MaterialCommunityIcons
        name={iconName}
        style={{
          fontSize: 24,
          color: themes.primary,
        }}
      />
    ) : null}
    {!(isAntDesignIcon || isMaterialCommunityIcons) ? (
      <Icon
        name={iconName}
        style={{
          fontSize: 24,
          color: themes.primary,
        }}
      />
    ) : null}
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

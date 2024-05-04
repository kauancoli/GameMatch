import React from "react";
import { View } from "react-native";

interface DividerProps {
  width?: number;
  orientation?: "horizontal" | "vertical";
  color?: string;
  dividerStyle?: any;
}

export const Divider: React.FC<DividerProps> = ({
  width = 1,
  orientation = "horizontal",
  color = "#d1d5db",
  dividerStyle,
}) => {
  const dividerStyles = [
    { width: orientation === "horizontal" ? "100%" : width },
    { height: orientation === "vertical" ? "100%" : width },
    { backgroundColor: color },
    { marginRight: orientation === "vertical" ? 5 : 0 },
    { marginLeft: orientation === "vertical" ? 5 : 0 },
    dividerStyle,
  ];

  return <View style={dividerStyles} />;
};

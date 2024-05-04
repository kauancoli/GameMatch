import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const BackButtonHeader = ({ title, onPressBack }) => {
  return (
    <View className="flex-row items-center justify-between w-full  ">
      <TouchableOpacity onPress={onPressBack}>
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-lg font-bold">{title}</Text>

      <View></View>
    </View>
  );
};

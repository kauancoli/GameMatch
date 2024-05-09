import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

export const MainHeader = () => {
  return (
    <View className="w-full flex-row justify-between items-center mt-5 bg-white p-2 rounded-lg">
      <Text className="text-lg font-bold">
        Game<Text className="text-match">Match</Text>
      </Text>
      <View className="rounded-full">
        <Fontisto name="bell" size={24} color="black" />
      </View>
    </View>
  );
};

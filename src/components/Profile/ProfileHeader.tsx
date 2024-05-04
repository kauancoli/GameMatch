import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export const ProfileHeader = () => {
  return (
    <View className="w-full flex-row justify-between items-center mt-4">
      <Text className="text-2xl font-bold">Profile</Text>
      <View className="bg-white rounded-full p-2 border border-cyan-100">
        <FontAwesome name="gear" size={24} color="black" />
      </View>
    </View>
  );
};

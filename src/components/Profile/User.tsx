import { Divider } from "@components/Controllers/Divider";
import React from "react";
import { Image, Text, View } from "react-native";

export const User = () => {
  return (
    <View className="w-full flex-row mt-8 mb-4 items-center">
      <View className="bg-white rounded-full p-1 border border-cyan-100">
        <Image
          source={{
            uri: "https://github.com/kauancoli.png",
          }}
          className="w-28 h-28 rounded-full"
        />
      </View>
      <View className="ml-2">
        <Text className="text-lg font-bold">Kauan Coli</Text>
        <Text className="text-md">@kayancoli</Text>

        <View className="flex-row mt-4 border rounded p-2 border-gray-300">
          <View className="flex-row items-center">
            <Text className="font-bold">999</Text>
            <Text className="ml-1">Followers</Text>
          </View>

          <Divider orientation="vertical" />

          <View className="flex-row items-center">
            <Text className="font-bold">3</Text>
            <Text className="ml-1">Following</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

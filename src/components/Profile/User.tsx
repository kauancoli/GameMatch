import { Divider } from "@components/Controllers/Divider";
import React from "react";
import { Image, Text, View } from "react-native";

export const User = () => {
  return (
    <View className="w-full items-center mt-8 mb-4">
      <View className="bg-white rounded-full p-1 border border-cyan-100">
        <Image
          source={{
            uri: "https://github.com/kauancoli.png",
          }}
          className="w-48 h-48 rounded-full"
        />
      </View>
      <View className="ml-2 items-center">
        <Text className="text-lg font-bold">
          Kauan Coli, <Text>20</Text>
        </Text>
        <Text className="text-md">@kayancoli</Text>
      </View>
    </View>
  );
};

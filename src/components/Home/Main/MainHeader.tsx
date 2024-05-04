import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

export const MainHeader = ({ name }: { name: string }) => {
  return (
    <View className="w-full flex-row justify-between items-center mt-4">
      <View className="flex-row justify-center items-center">
        <Image
          source={{
            uri: "https://github.com/kauancoli.png",
          }}
          className="w-12 h-12 rounded-full"
        />
        <View className="ml-2">
          <Text className="text-lg font-bold">Ei, {name}</Text>
          <Text className="text-xs">O que gostaria de ver hoje?</Text>
        </View>
      </View>
      <View className="bg-white rounded-full p-3 border border-cyan-100">
        <Fontisto name="bell" size={24} color="black" />
      </View>
    </View>
  );
};

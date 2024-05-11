import React from "react";
import { Image, Text, View } from "react-native";

export const User = () => {
  return (
    <View className="w-full items-center mb-2">
      <View className="bg-white rounded-full p-1 border border-cyan-100">
        <Image
          source={{
            uri: "https://pbs.twimg.com/media/EmunoNVW4AEbFDV.jpg",
          }}
          className="w-48 h-48 rounded-full"
        />
      </View>
      <View className="ml-2 items-center">
        <Text className="text-lg font-bold">
          Killua Curintia, <Text>20</Text>
        </Text>
        <Text className="text-md">@kuallua</Text>
      </View>
    </View>
  );
};

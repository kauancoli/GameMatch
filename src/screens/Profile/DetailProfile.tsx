import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export const DetailProfile = ({ data, onBack }) => {
  return (
    <View className="flex-row justify-center p-4">
      <TouchableOpacity onPress={onBack} className="absolute top-10 left-5">
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <User profile={data} />
    </View>
  );
};

const User = ({ profile }) => {
  return (
    <View className="items-center justify-center">
      <View className="bg-white rounded-full p-1 border border-cyan-100">
        <Image
          source={{
            uri: profile?.photoURL,
          }}
          className="w-48 h-48 rounded-full"
        />
      </View>
      <View className="ml-2 items-center">
        <Text className="text-lg font-bold">
          {profile?.name}, <Text>{profile?.age}</Text>
        </Text>
      </View>
      <ScrollView
        className="max-h-32 mt-2 p-2"
        horizontal={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text className="text-sm">{profile?.description}</Text>
      </ScrollView>
    </View>
  );
};

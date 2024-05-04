import { Arts } from "@components/Controllers/Arts/Art";
import { BackButtonHeader } from "@components/Controllers/BackButtonHeader";
import { DetailProfileHeader } from "@components/Home";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const DetailProfile = () => {
  return (
    <View className="flex-1 justify-center items-center p-8">
      <BackButtonHeader title="Detail Profile" onPressBack={() => {}} />

      <DetailProfileHeader />
      <DetailProfileArtwork />

      <View>
        <Arts title="Artworks" artworks={[]} />
      </View>
    </View>
  );
};

export const DetailProfileArtwork = () => {
  return (
    <View className="w-full flex-row items-center justify-between p-4">
      <Text className="text-xl font-bold">Artworks</Text>
      <TouchableOpacity className="flex-row items-center">
        <FontAwesome name="filter" size={24} color="black" />
        <Text className="text-sm ml-2">Sort & Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

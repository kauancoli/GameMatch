import { Artwork, ListProps } from "@dtos/Profile/ListType";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const ArtworkItem = ({ imageUrl }: Artwork) => {
  return (
    <View className="rounded-lg p-2">
      <Image source={{ uri: imageUrl }} className="w-28 h-28 rounded-lg" />
    </View>
  );
};

export const List = ({ title, artworks }: ListProps) => {
  return (
    <View className="mt-4 w-full">
      <View className="mb-4 flex-row justify-between">
        <Text className="text-lg font-bold">
          {title} <Text className="text-md font-light">{artworks.length}</Text>
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
      <View className="flex-row justify-around gap-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {artworks.map((artwork, index) => (
            <ArtworkItem key={index} imageUrl={artwork.imageUrl} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

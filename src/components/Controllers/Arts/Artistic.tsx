import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { ArtTitle } from "./ArtTitle";
import { ArtistsProps } from "@dtos/Home/ArtistisType";

interface Artist {
  imageUrl: string;
  name: string;
  followers: number;
  user: string;
}

const ArtistItem = ({ imageUrl, name, followers, user }: Artist) => {
  return (
    <View className="flex-row items-center pr-5">
      <Image source={{ uri: imageUrl }} className="w-14 h-14 rounded-full" />
      <View className="ml-2">
        <Text className="text-base font-bold">{name}</Text>
        <Text className="text-xs text-gray-500">
          {followers.toLocaleString()} Followers
        </Text>
      </View>
    </View>
  );
};

export const Artistic = ({ title, artistis, onPress }: ArtistsProps) => {
  return (
    <View className="mt-4 w-full">
      <ArtTitle title={title} onPress={onPress} />
      <View className="flex-row justify-around">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {artistis.map((artwork, index) => (
            <ArtistItem
              key={index}
              name={artwork.name}
              user={artwork.user}
              imageUrl={artwork.imageUrl}
              followers={artwork.followers}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

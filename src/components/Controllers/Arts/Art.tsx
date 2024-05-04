import { ArtProp, Artwork } from "@dtos/Home/ArtType";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { ArtTitle } from "./ArtTitle";

export const ArtworkItem = ({ imageUrl, creator, title }: Artwork) => {
  return (
    <View className="pr-4">
      <Image source={{ uri: imageUrl }} className="w-52 h-52 rounded" />
      <View className="mt-2">
        <Text className="text-base font-bold">{title}</Text>
        {creator && (
          <View className="flex-row items-center gap-2">
            <Image
              source={{ uri: creator.photo }}
              className={`w-12 h-12 rounded-full`}
            />
            <View>
              <Text className="text-xs">{creator.name}</Text>
              <Text className="text-xs font-bold">{creator.user}</Text>
            </View>
          </View>
        )}
        {/* <Text className="text-xs">{createdAt}</Text> */}
      </View>
    </View>
  );
};

export const Arts = ({ title, artworks, onPress }: ArtProp) => {
  return (
    <View className="mt-4 w-full">
      {title && <ArtTitle title={title} onPress={onPress} />}

      <View className="flex-row justify-around">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {artworks.map((artwork, index) => (
            <ArtworkItem
              key={index}
              title={artwork.title}
              imageUrl={artwork.imageUrl}
              creator={artwork.creator}
              createdAt={artwork.createdAt}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

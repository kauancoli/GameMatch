import { ItemList, ListProps } from "@dtos/Profile/ListType";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

const Item = ({ imageUrl }: ItemList) => {
  return (
    <View className="rounded-lg p-2">
      <Image source={{ uri: imageUrl }} className="w-28 h-28 rounded-lg" />
    </View>
  );
};

export const List = ({ title, itemList }: ListProps) => {
  return (
    <View className="mt-4 w-full">
      <View className="mb-4 flex-row justify-between">
        <Text className="text-lg font-bold">
          {title} <Text className="text-md font-light">{itemList.length}</Text>
        </Text>
        <AntDesign name="right" size={24} color="black" />
      </View>
      <View className="flex-row justify-around gap-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {itemList.map((artwork, index) => (
            <Item key={index} imageUrl={artwork.imageUrl} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const ItemGrid = ({ imageUrl }: ItemList) => {
  return (
    <View className="rounded p-2">
      <Image source={{ uri: imageUrl }} className="w-44 h-44 rounded-lg" />
    </View>
  );
};

export const Grid = ({ title, itemList }: ListProps) => {
  return (
    <View className="mt-4 w-full items-center">
      <FlatList
        data={itemList}
        renderItem={({ item, index }) => (
          <ItemGrid key={index} imageUrl={item.imageUrl} />
        )}
        keyExtractor={(item) => item.imageUrl}
        numColumns={2}
      />
    </View>
  );
};

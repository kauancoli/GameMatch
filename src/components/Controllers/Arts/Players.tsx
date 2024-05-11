import { Player, PlayerProps } from "@dtos/Home/PlayerType";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const Item = ({ imageUrl, age, favoriteGames, name, user }: Player) => {
  return (
    <View className="mb-4">
      <Image
        source={{ uri: imageUrl }}
        className="w-[360] h-[500] rounded-lg"
      />
      <View className="mt-2">
        <View className="flex-row">
          <Text className="text-xl font-bold pr-2">{name},</Text>
          <Text className="text-xl font-bold">{age}</Text>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-md">{favoriteGames.join(", ")}</Text>
        </View>
      </View>
    </View>
  );
};

export const Players = ({ players }: PlayerProps) => {
  return (
    <View className="p-2 w-full bg-yellow-300 rounded-lg">
      <View className="flex-row justify-around">
        {players.map((p, index) => (
          <Item
            key={index}
            age={p.age}
            favoriteGames={p.favoriteGames}
            imageUrl={p.imageUrl}
            name={p.name}
            user={p.user}
          />
        ))}
      </View>

      <View className="flex-row justify-center gap-8">
        <TouchableOpacity className="p-2 bg-white rounded-full">
          <Feather name="x" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-white rounded-full">
          <FontAwesome name="diamond" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2 bg-white rounded-full">
          <Ionicons name="game-controller-outline" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

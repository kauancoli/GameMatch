import { Players } from "@components/Controllers/Arts/Players";
import json from "@mocks/players.json";
import React from "react";
import { Text, View } from "react-native";

export const Home = () => {
  const { player } = json;
  return (
    <View className="flex-1 justify-center p-4">
      <View>
        <Text className="text-2xl font-bold mt-4 ">Jogadores</Text>
        <Text className="text-sm ">Encontre seu duo para a jogatina</Text>
      </View>
      <Players players={player} />
    </View>
  );
};

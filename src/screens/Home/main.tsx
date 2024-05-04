import { Arts } from "@components/Controllers/Arts/Art";
import { Artistic } from "@components/Controllers/Arts/Artistic";
import { Input } from "@components/Controllers/Input";
import { MainHeader } from "@components/Home";
import jsonArtistic from "@mocks/artistics.json";
import jsonArts from "@mocks/arts.json";
import React from "react";
import { ScrollView, View } from "react-native";

export const Home = () => {
  const { popular, trending } = jsonArts;
  return (
    <View className="flex-1 justify-center items-center p-8">
      <MainHeader name={"Kauan"} />
      <View className="w-full">
        <Input placeholder="Search Items..." fullWidth={false} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Arts title="Popular" artworks={popular} />
        <View className="mb-6"></View>

        <Artistic title="Artist of the Week" artistis={jsonArtistic} />

        <View className="mb-6"></View>

        <Arts title="Trending" artworks={trending} />
      </ScrollView>
    </View>
  );
};

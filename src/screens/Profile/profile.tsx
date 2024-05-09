import { MainHeader } from "@components/Home";
import { List, User } from "@components/Profile";
import React from "react";
import { ScrollView, View } from "react-native";

export const Profile = () => {
  return (
    <View className="flex-1 justify-center items-center p-8">
      <MainHeader />
      <User />

      <ScrollView showsVerticalScrollIndicator={false}>
        <List
          title="Interesses"
          artworks={[
            { imageUrl: "https://picsum.photos/200" },
            { imageUrl: "https://picsum.photos/203" },
            { imageUrl: "https://picsum.photos/202" },
            { imageUrl: "https://picsum.photos/201" },
          ]}
        />

        <List
          title="Jogos Favoritos"
          artworks={[
            { imageUrl: "https://picsum.photos/400" },
            { imageUrl: "https://picsum.photos/403" },
            { imageUrl: "https://picsum.photos/402" },
            { imageUrl: "https://picsum.photos/401" },
          ]}
        />
      </ScrollView>
    </View>
  );
};

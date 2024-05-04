import { Button } from "@components/Controllers/Button";
import { List, ProfileHeader, User } from "@components/Profile";
import React from "react";
import { ScrollView, View } from "react-native";

export const Profile = () => {
  return (
    <View className="flex-1 justify-center items-center p-8">
      <ProfileHeader />
      <User />

      <ScrollView showsVerticalScrollIndicator={false}>
        <List
          title="My Work"
          artworks={[
            { imageUrl: "https://picsum.photos/200" },
            { imageUrl: "https://picsum.photos/203" },
            { imageUrl: "https://picsum.photos/202" },
            { imageUrl: "https://picsum.photos/201" },
          ]}
        />

        <List
          title="Wishlist"
          artworks={[
            { imageUrl: "https://picsum.photos/102" },
            { imageUrl: "https://picsum.photos/101" },
          ]}
        />

        <List
          title="Banda x"
          artworks={[
            { imageUrl: "https://picsum.photos/300" },
            { imageUrl: "https://picsum.photos/303" },
            { imageUrl: "https://picsum.photos/302" },
          ]}
        />

        <List
          title="Favoritos"
          artworks={[
            { imageUrl: "https://picsum.photos/400" },
            { imageUrl: "https://picsum.photos/403" },
            { imageUrl: "https://picsum.photos/402" },
            { imageUrl: "https://picsum.photos/401" },
          ]}
        />
      </ScrollView>

      <View className="mt-14 w-full">
        <Button title="Logout" onPress={() => {}} fullWidth={true} />
      </View>
    </View>
  );
};

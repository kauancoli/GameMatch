import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const Match = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View>
      <View>
        <Image source={{ uri: "https://links.papareact.com/mg9" }} />
      </View>

      <Text>Você e {userSwiped.displayName} curtiram um ao outro.</Text>
      <View>
        <Image source={{ uri: loggedInProfile.photoURL }} />
        <Image source={{ uri: userSwiped.photoURL }} />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          navigation.navigate("Chat");
        }}
      >
        <Text>Enviar mensagem</Text>
      </TouchableOpacity>
    </View>
  );
};

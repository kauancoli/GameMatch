import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "@services/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export const Explorer = () => {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "games"), (snapshot) => {
      const gamesData = snapshot.docs.map((doc) => doc.data());
      setGames(gamesData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => doc.data());
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, []);

  const handleItemPress = (type, item) => {
    navigation.navigate("HomeFiltered", {
      filterType: type,
      filterValue: item.name,
    });
  };

  return (
    <View className="flex-1 p-4">
      <View>
        <Text className="text-2xl font-bold">Para você</Text>
        <Text className="text-sm ">Recomendações baseada no seu perfil</Text>
      </View>

      <List
        title="Jogos do seu interesse"
        itemList={games.map((game) => ({
          name: game.name,
          photoURL: game.photoURL,
        }))}
        onItemPress={(item) => handleItemPress("games", item)}
      />

      <List
        title="Categorias"
        itemList={categories.map((category) => ({
          name: category.name,
          photoURL: category.photoURL,
        }))}
        onItemPress={(item) => handleItemPress("categories", item)}
      />
    </View>
  );
};

const List = ({ title, itemList, onItemPress }) => {
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
          {itemList.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => onItemPress(item)}>
              <Item name={item.name} photoURL={item.photoURL} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const Item = ({ name, photoURL }) => {
  return (
    <View className="rounded-lg p-2 items-center">
      <Image
        source={photoURL ? { uri: photoURL } : require("@assets/GameMatch.png")}
        className="w-28 h-28 rounded-lg"
      />
      <Text className="text-xs">{name}</Text>
    </View>
  );
};

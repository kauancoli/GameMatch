import { Button, ButtonStyles } from "@components/Controllers/Button";
import { ItemList } from "@dtos/Profile/ListType";
import { UserDTO } from "@dtos/User/UserType";
import { AntDesign } from "@expo/vector-icons";
import useAuth from "@hooks/useAuth";
import { ModalScreen } from "@screens/Modal/modal";
import { db } from "@services/firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Modal, ScrollView, Text, View } from "react-native";

export const Profile = () => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [data, setData] = useState<UserDTO>({
    id: "",
    name: "",
    photoURL: "",
    games: [],
    categories: [],
    gender: "",
    description: "",
    age: 0,
  });

  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDoc = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setData({
            id: userData.id,
            name: userData.name,
            description: userData.description,
            photoURL: userData.photoURL,
            games: userData.games,
            categories: userData.categories,
            age: userData.age,
            gender: userData.gender,
          });
        }
      });
      return unsubscribe;
    };
    fetchUserProfile();
  }, [user]);

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

  return (
    <View className="flex-1 justify-center items-center p-4">
      <User profile={data} />
      <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
        <List
          title="Jogos Favoritos"
          itemList={
            games.filter((game) =>
              data?.games?.includes(game.name)
            ) as ItemList[]
          }
        />

        <List
          title="Categorias Favoritas"
          itemList={
            categories.filter((category) =>
              data?.categories?.includes(category.name)
            ) as ItemList[]
          }
        />
      </ScrollView>

      <View className="pt-4">
        <Button
          title="Editar Perfil"
          onPress={handleEditProfile}
          buttonStyle={ButtonStyles.black}
        />
      </View>

      <Modal visible={modalVisible} onRequestClose={handleCloseModal}>
        <ModalScreen onClose={handleCloseModal} />
      </Modal>
    </View>
  );
};

const User = ({ profile }) => {
  return (
    <View className="w-full items-center mb-2">
      <View className="bg-white rounded-full p-1 border border-cyan-100">
        <Image
          source={{
            uri: profile?.photoURL,
          }}
          className="w-48 h-48 rounded-full"
        />
      </View>
      <View className="ml-2 items-center">
        <Text className="text-lg font-bold">
          {profile?.name}, <Text>{profile?.age}</Text>
        </Text>

        <ScrollView
          className="max-h-24 mt-2"
          horizontal={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text className="text-sm">{profile?.description}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const List = ({ title, itemList }) => {
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
          {itemList.map(
            (game: { name: string; photoURL: string }, index: React.Key) => (
              <Item key={index} name={game.name} photoURL={game.photoURL} />
            )
          )}
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

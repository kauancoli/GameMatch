import { Button, ButtonStyles } from "@components/Controllers/Button";
import { List } from "@components/Profile";
import useAuth from "@hooks/useAuth";
import { ModalScreen } from "@screens/Modal/modal";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const Profile = () => {
  const { profile } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <User profile={profile} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <List
          title="Jogos Favoritos"
          itemList={[
            {
              imageUrl:
                "https://i.scdn.co/image/ab6761610000e5ebe80d1ffb81aa6503ad41c574",
            },
            {
              imageUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Overwatch_2_logo.svg/2560px-Overwatch_2_logo.svg.png",
            },
            { imageUrl: "https://pbs.twimg.com/media/F0mwwp4XgAMdS1x.jpg" },
          ]}
        />

        <List
          title="Categorias Favoritas"
          itemList={[
            {
              imageUrl:
                "https://static.vecteezy.com/ti/vetor-gratis/p3/15155657-icone-de-alvo-de-arma-para-a-categoria-de-jogos-fps-gratis-vetor.jpg",
            },
            {
              imageUrl:
                "https://2.bp.blogspot.com/-kXfJIP_Zk0I/VWifW7wcsEI/AAAAAAAACEI/8t72GBLA_Lk/s1600/pYH9oSg.jpg",
            },
            {
              imageUrl:
                "https://notadogame.com/uploads/game/cover/250x/5bfdc39bd3791.jpg",
            },
            {
              imageUrl:
                "https://i0.wp.com/geekpopnews.com.br/wp-content/uploads/2023/01/jogos-de-luta.jpg?resize=1280%2C640&ssl=1",
            },
            {
              imageUrl:
                "https://i0.wp.com/www.segredosgeek.com/wp-content/uploads/2015/07/melhores-rpg-jogos-para-android.jpg",
            },
          ]}
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
        <TouchableOpacity onPress={handleCloseModal}>
          <Text>Fechar</Text>
        </TouchableOpacity>
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
        <Text className="text-md">@kuallua</Text>
      </View>
    </View>
  );
};

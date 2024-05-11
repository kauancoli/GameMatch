import { Button, ButtonStyles } from "@components/Controllers/Button";
import { List, User } from "@components/Profile";
import React from "react";
import { ScrollView, View } from "react-native";


export const Profile = () => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <User />

      <ScrollView showsVerticalScrollIndicator={false}>
        <List
          title="Jogos Favoritos"
          itemList={[
            { imageUrl: "https://i.scdn.co/image/ab6761610000e5ebe80d1ffb81aa6503ad41c574" },
            { imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Overwatch_2_logo.svg/2560px-Overwatch_2_logo.svg.png" },
            { imageUrl: "https://pbs.twimg.com/media/F0mwwp4XgAMdS1x.jpg" },
          ]}
        />

        <List title="Categorias Favoritas"
          itemList={[
            { imageUrl: "https://static.vecteezy.com/ti/vetor-gratis/p3/15155657-icone-de-alvo-de-arma-para-a-categoria-de-jogos-fps-gratis-vetor.jpg" },
            { imageUrl: "https://2.bp.blogspot.com/-kXfJIP_Zk0I/VWifW7wcsEI/AAAAAAAACEI/8t72GBLA_Lk/s1600/pYH9oSg.jpg" },
            { imageUrl: "https://notadogame.com/uploads/game/cover/250x/5bfdc39bd3791.jpg" },
            { imageUrl: "https://i0.wp.com/geekpopnews.com.br/wp-content/uploads/2023/01/jogos-de-luta.jpg?resize=1280%2C640&ssl=1" },
            { imageUrl: "https://i0.wp.com/www.segredosgeek.com/wp-content/uploads/2015/07/melhores-rpg-jogos-para-android.jpg" },

          ]}
        />
      </ScrollView>

      <View className="pt-4">
        <Button
          title="Editar Perfil"
          onPress={() => { }}
          buttonStyle={ButtonStyles.black}
        />
      </View>
    </View>
  );
};

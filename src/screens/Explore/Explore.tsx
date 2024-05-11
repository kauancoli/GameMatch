import { List } from "@components/Profile";
import React from "react";
import { Text, View } from "react-native";

export const Explorer = () => {
  return (
    <View className="flex-1 justify-center p-4">
      <View>
        <Text className="text-2xl font-bold">Para você</Text>
        <Text className="text-sm ">Recomendações baseada no seu perfil</Text>
      </View>

      <List title="Jogos do seu interesse"
        itemList={[
          { imageUrl: "https://i.scdn.co/image/ab6761610000e5ebe80d1ffb81aa6503ad41c574" },
          { imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Overwatch_2_logo.svg/2560px-Overwatch_2_logo.svg.png" },
          { imageUrl: "https://pbs.twimg.com/media/F0mwwp4XgAMdS1x.jpg" },
        ]}
      />

      <List title="Categorias"
        itemList={[
          { imageUrl: "https://static.vecteezy.com/ti/vetor-gratis/p3/15155657-icone-de-alvo-de-arma-para-a-categoria-de-jogos-fps-gratis-vetor.jpg" },
          { imageUrl: "https://2.bp.blogspot.com/-kXfJIP_Zk0I/VWifW7wcsEI/AAAAAAAACEI/8t72GBLA_Lk/s1600/pYH9oSg.jpg" },
          { imageUrl: "https://notadogame.com/uploads/game/cover/250x/5bfdc39bd3791.jpg" },
          { imageUrl: "https://i0.wp.com/geekpopnews.com.br/wp-content/uploads/2023/01/jogos-de-luta.jpg?resize=1280%2C640&ssl=1" },
          { imageUrl: "https://i0.wp.com/www.segredosgeek.com/wp-content/uploads/2015/07/melhores-rpg-jogos-para-android.jpg" },

        ]}
      />

      <List title="Modo de Jogo"
        itemList={[
          { imageUrl: "https://i.ytimg.com/vi/sI4PBW8g210/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBqlQ6fgg06plIM41-5iXiqroAc-Q" },
          { imageUrl: "https://i0.wp.com/www.segredosgeek.com/wp-content/uploads/2015/06/lista-melhores-jogos-android-multiplayer-android.jpg" },
          { imageUrl: "https://psup.com.br/wp-content/uploads/2024/02/Os-12-Melhores-Jogos-de-Coop-Local-para-Nintendo-Switch.jpg" },
        ]}
      />
    </View>
  );
};

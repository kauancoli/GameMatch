import React from "react";
import { FlatList, Text, View } from "react-native";
import { ChatRow } from "./ChatRow";

const ChatList = ({ setSelectedProfile, data }) => {
  return data.length > 0 ? (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatRow setSelectedProfile={setSelectedProfile} matchDetails={item} />
      )}
    />
  ) : (
    <View className="items-center">
      <Text>Sem matches no momento 😢</Text>
    </View>
  );
};

export default ChatList;

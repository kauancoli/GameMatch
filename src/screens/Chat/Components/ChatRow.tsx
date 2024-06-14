import useAuth from "@hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import getMactchedUserInfo from "src/lib/getMatchedUserInfo";

export const ChatRow = ({ matchDetails, setSelectedProfile }) => {
  const [matchedUserInfo, setMatchedUserInfo] = useState({
    name: "",
    photoURL: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    setMatchedUserInfo(getMactchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  return (
    <TouchableOpacity
      className="flex-row rounded-lg bg-white mx-3 my-1 py-3 px-5 items-center"
      onPress={() => setSelectedProfile(matchedUserInfo)}
    >
      <Image
        className="w-16 h-16 mr-4 rounded-full"
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text className="text-lg font-semibold">{matchedUserInfo?.name}</Text>
        <Text>Diga Oi!</Text>
      </View>
    </TouchableOpacity>
  );
};

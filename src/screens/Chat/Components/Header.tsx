import { Foundation, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();
  return (
    <View className="p-2 flex-row items-center justify-between">
      <View className="p-2 flex-row items-center">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="#FF5864" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity className="rounded-full mr-4 p-3 bg-red-200">
          <Foundation name="telephone" size={20} color="#FF5864" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

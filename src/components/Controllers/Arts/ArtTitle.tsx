import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ArtTitleProps {
  title: string;
  onPress: () => void;
}

export const ArtTitle = ({ title, onPress }: ArtTitleProps) => {
  return (
    <View className="mb-4 flex-row justify-between items-center">
      <Text className="text-lg font-bold">{title}</Text>
      <TouchableOpacity className="text-sm p-2" onPress={onPress}>
        <Text>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

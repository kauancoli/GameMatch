import { Fontisto } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  fullWidth?: boolean;
};

export const Input: React.FC<Props> = ({
  label,
  fullWidth = false,
  ...rest
}) => {
  return (
    <View className={`mb-4 ${fullWidth ? "w-full items-center" : ""}`}>
      <Text className="font-bold">{label}</Text>
      <View className="flex-row items-center border-2 rounded p-2 border-gray-300">
        <Fontisto
          name="zoom"
          size={20}
          color="gray"
          style={{ marginRight: 10 }}
        />
        <TextInput {...rest} className="flex-1"></TextInput>
      </View>
    </View>
  );
};

import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import useAuth from "src/hooks/useAuth";

export const MainHeader = () => {
  const { logout, user } = useAuth();

  return (
    <View>
      {user && (
        <View className="w-full mt-12 bg-white p-2 rounded-lg">
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold">
              Game<Text className="text-match">Match</Text>
            </Text>
            <View className="rounded-full">
              <MaterialCommunityIcons
                name="exit-to-app"
                size={24}
                color="black"
                onPress={logout}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

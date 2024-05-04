import { Button, ButtonStyles } from "@components/Controllers/Button";
import { Divider } from "@components/Controllers/Divider";
import { Image, Text, View } from "react-native";

export const DetailProfileHeader = () => {
  return (
    <View className="mt-8">
      <View className="w-full flex-row items-center justify-around">
        <Image
          source={{
            uri: "https://cdn.britannica.com/36/69636-050-81A93193/Self-Portrait-artist-panel-board-Vincent-van-Gogh-1887.jpg",
          }}
          className="w-24 h-24 rounded-full"
        />

        <View className="flex-row justify-between">
          <View className="items-center ml-2">
            <Text className="font-bold text-lg">9</Text>
            <Text className="text-sm text-gray-500">Works</Text>
          </View>

          <Divider orientation="vertical" />

          <View className="items-center ml-2">
            <Text className="font-bold text-lg">126</Text>
            <Text className="text-sm text-gray-500">Followers</Text>
          </View>

          <Divider orientation="vertical" />

          <View className="items-center ml-2">
            <Text className="font-bold text-lg">0</Text>
            <Text className="text-sm text-gray-500">Following</Text>
          </View>
        </View>
      </View>

      <View className="ml-4 mt-6">
        <Text className="text-xl font-bold">Van Gogh</Text>
        <Text className="text-sm text-gray-500">@vangogh</Text>

        <Text className="text-sm mt-2 text-gray-500">
          Vincent van Gogh was a Dutch painter, generally considered to be the
          greatest after Rembrandt van Rijn, and one of the greatest of the
          Post-Impressionists <Text className="text-black">read more...</Text>
        </Text>
      </View>

      <View className="flex-row mt-2 p-4">
        <View className="mr-3">
          <Button
            title="Follow"
            onPress={() => {}}
            buttonStyle={ButtonStyles.black}
          />
        </View>
        <View>
          <Button
            title="Message"
            onPress={() => {}}
            buttonStyle={{
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "black",
            }}
            titleStyle={{ color: "black" }}
          />
        </View>
      </View>
    </View>
  );
};

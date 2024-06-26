import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Chat } from "@screens/Chat/Chat";
import { Explorer } from "@screens/Explore/Explore";
import { Like } from "@screens/Like/Like";
import { Profile } from "@screens/Profile/Profile";
import { HomeStack } from "./home.routes";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome6 name="house-chimney" size={24} color="black" />
          ),
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#f0f0f0",
        }}
      />

      <Tab.Screen
        name="Explore"
        component={Explorer}
        options={{
          tabBarIcon: () => <Feather name="compass" size={24} color="black" />,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#f0f0f0",
        }}
      />

      <Tab.Screen
        name="Like"
        component={Like}
        options={{
          tabBarIcon: () => <AntDesign name="hearto" size={24} color="black" />,
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#f0f0f0",
        }}
      />

      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbox-outline" size={24} color="black" />
          ),
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#f0f0f0",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="user-o" size={24} color="black" />
          ),
          tabBarShowLabel: false,
          tabBarActiveBackgroundColor: "#f0f0f0",
        }}
      />
    </Tab.Navigator>
  );
}

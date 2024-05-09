import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Explorer } from "@screens/Explore";
import { Home } from "@screens/Home/main";
import { Like } from "@screens/Like";
import { Chat } from "@screens/Chat";
import { Profile } from "@screens/Profile/profile";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
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

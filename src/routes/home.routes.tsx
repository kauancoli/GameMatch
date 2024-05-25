import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "@screens/Home/Home";
import { HomeFiltered } from "@screens/Home/HomeFiltered";

const Stack = createStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={Home} />
      <Stack.Screen name="HomeFiltered" component={HomeFiltered} />
    </Stack.Navigator>
  );
}

import useAuth from "@hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeFiltered } from "@screens/Home/HomeFiltered";
import { LoginScreen } from "@screens/Login/Login";
import React from "react";
import TabRoutes from "./tab.routes";

const Stack = createStackNavigator();

const Routes = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="TabRoutes" component={TabRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

import useAuth from "@hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "@screens/Login/Login";
import React from "react";
import TabRoutes from "./tab.routes";

const Routes = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {!user ? <LoginScreen /> : <TabRoutes />}
    </NavigationContainer>
  );
};

export default Routes;

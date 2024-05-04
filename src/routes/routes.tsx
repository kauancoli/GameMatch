import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import TabRoutes from "./tab.routes";

const Routes = () => {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
};

export default Routes;

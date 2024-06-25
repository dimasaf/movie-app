import React from "react";
import BottomTabNavigator from "./src/navigations/BottomTabNavigations";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

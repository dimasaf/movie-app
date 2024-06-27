import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MovieDetail from "../screens/MovieDetail";
import MovieList from "../screens/MovieList";

const Stack = createNativeStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"MovieList"} component={MovieList} />
      <Stack.Screen name={"MovieDetail"} component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { CreateReviewScreen } from "../screens/CreateReviewScreen";
/* types */
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const MainStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "#000",
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Shop" component={ShopScreen} />
  </Stack.Navigator>
);

export const HomeStackNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="Main"
      component={MainStack}
      options={{ headerShown: false }}
    />
    <RootStack.Screen
      name="CreateReview"
      component={CreateReviewScreen}
      options={{ presentation: "modal" }}
    />
  </RootStack.Navigator>
);

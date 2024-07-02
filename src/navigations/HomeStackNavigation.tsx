import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/Home"
import MovieDetail from "../screens/MovieDetail"
import Favorite from "../screens/Favorite"

export type RootStackParamList = {
  HomeScreen: undefined
  MovieDetail: { id: number }
  HomeFavorite: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const HomeStackNavigator = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name='HomeScreen' component={Home} options={{ headerShown: false }} />
    <Stack.Screen name='MovieDetail' component={MovieDetail} options={{ headerShown: true }} />
    <Stack.Screen name='HomeFavorite' component={Favorite} options={{ headerShown: true }} />
  </Stack.Navigator>
)

export default HomeStackNavigator

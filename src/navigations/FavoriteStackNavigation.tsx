import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Favorite from "../screens/Favorite"
import MovieDetail from "../screens/MovieDetail"

export type RootStackParamList = {
  FavoriteScreen: undefined
  MovieDetail: { id: number }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const FavoriteStackNavigator = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name='FavoriteScreen' component={Favorite} options={{ headerShown: false }} />
    <Stack.Screen name='MovieDetail' component={MovieDetail} options={{ headerShown: true }} />
  </Stack.Navigator>
)

export default FavoriteStackNavigator

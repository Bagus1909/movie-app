import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MovieDetail from "../screens/MovieDetail"
import KeywordSearch from "../components/search/KeywordSearch"

export type RootStackParamList = {
  KeywordScreen: undefined
  MovieDetail: { id: number }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const FavoriteStackNavigator = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name='KeywordScreen' component={KeywordSearch} options={{ headerShown: false }} />
    <Stack.Screen name='MovieDetail' component={MovieDetail} options={{ headerShown: true }} />
  </Stack.Navigator>
)

export default FavoriteStackNavigator

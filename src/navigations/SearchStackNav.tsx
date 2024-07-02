import React from "react"
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"
import Search from "../screens/Search"
import CategoryMovies from "../screens/CategoryMovies"
import MovieDetail from "../screens/MovieDetail"
import { SearchStackParamList } from "../types/navigation"

const Stack = createStackNavigator<SearchStackParamList>()

const SearchStackNavigator = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name='SearchScreen' component={Search} options={{ headerShown: false }} />
    <Stack.Screen
      name='CategoryMovies'
      component={CategoryMovies}
      options={({ route }) => ({ title: `${route.params.name} Movies` })}
    />
    <Stack.Screen name='MovieDetail' component={MovieDetail} options={{ headerShown: true }} />
  </Stack.Navigator>
)

export default SearchStackNavigator

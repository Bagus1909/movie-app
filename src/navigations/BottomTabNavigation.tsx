import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Feather } from "@expo/vector-icons"
import HomeStackNavigator from "./HomeStackNavigation"
import SearchStackNavigator from "./SearchStackNav"
import FavoriteStackNavigator from "./FavoriteStackNavigation"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = (): JSX.Element => (
  <Tab.Navigator>
    <Tab.Screen
      name='Home'
      component={HomeStackNavigator}
      options={{
        tabBarIcon: ({ color }) => <Feather name='home' size={28} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name='Search'
      component={SearchStackNavigator}
      options={{
        tabBarIcon: ({ color }) => <Feather name='search' size={28} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name='Favorite'
      component={FavoriteStackNavigator}
      options={{
        tabBarIcon: ({ color }) => <Feather name='heart' size={28} color={color} />,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
)

export default BottomTabNavigator

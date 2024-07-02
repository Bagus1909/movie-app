import React, { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import MovieItem from "../components/movies/MovieItem"
import type { Movie } from "../types/app"

const Favorite = (): JSX.Element => {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await AsyncStorage.getItem("favorites")
        if (favoritesData !== null) {
          setFavorites(JSON.parse(favoritesData))
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchFavorites()
  }, [favorites])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View style={styles.movieItemContainer}>
            <MovieItem
              movie={item}
              size={{ width: Dimensions.get("window").width / 3 - 16, height: 200 }}
              coverType='poster'
            />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContentContainer}
        numColumns={3}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#343a40",
    textAlign: "center",
  },
  flatListContentContainer: {
    paddingBottom: 16,
  },
  movieItemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fff",
  },
})

export default Favorite

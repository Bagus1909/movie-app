// src/screens/CategoryMovies.tsx
import React, { useEffect, useState } from "react"
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native"
import { API_ACCESS_TOKEN } from "@env"
import type { Movie } from "../types/app"
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { SearchStackParamList } from "../types/navigation"

type CategoryMoviesRouteProp = RouteProp<SearchStackParamList, "CategoryMovies">
type NavigationProp = StackNavigationProp<SearchStackParamList, "CategoryMovies">

const CategoryMovies = (): JSX.Element => {
  const route = useRoute<CategoryMoviesRouteProp>()
  const navigation = useNavigation<NavigationProp>()
  const { id, name } = route.params
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      }

      try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`, options)
        const data = await response.json()
        if (data.results) {
          setMovies(data.results)
        }
      } catch (error) {
        console.error("Error fetching movies by category:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [id])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name} Movies</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("MovieDetail", { id: item.id })}>
            <View style={styles.resultItem}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} style={styles.poster} />
              <View style={styles.movieInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.rating}>Rating: {item.vote_average}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieInfo: {
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    marginTop: 5,
    fontSize: 16,
    color: "#666",
  },
})

export default CategoryMovies

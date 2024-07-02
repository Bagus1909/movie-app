import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, ScrollView, ImageBackground, StatusBar, TouchableOpacity } from "react-native"
import { API_ACCESS_TOKEN } from "@env"
import MovieList from "../components/movies/MovieList"
import { FontAwesome } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    fetchMovieDetail()
    checkFavoriteStatus()
  }, [id])

  const fetchMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async response => await response.json())
      .then(response => {
        setMovie(response)
      })
      .catch(errorResponse => {
        console.log(errorResponse)
      })
  }

  const checkFavoriteStatus = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites")
      if (favorites !== null) {
        const favoriteMovies = JSON.parse(favorites)
        setIsFavorite(favoriteMovies.some((fav: any) => fav.id === id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites")
      const favoriteMovies = favorites ? JSON.parse(favorites) : []
      favoriteMovies.push(movie)
      await AsyncStorage.setItem("favorites", JSON.stringify(favoriteMovies))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites")
      const favoriteMovies = favorites ? JSON.parse(favorites) : []
      const updatedFavorites = favoriteMovies.filter((fav: any) => fav.id !== id)
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      setIsFavorite(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar translucent={false} />
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
        style={styles.backdropImage}>
        <LinearGradient
          colors={["#00000000", "rgba(0, 0, 0, 0.7)"]}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}>
          <View style={styles.titleContainer}>
            <View style={styles.titleAndRating}>
              <Text style={styles.title}>{movie.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name='star' size={16} color='yellow' />
                <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={isFavorite ? removeFavorite : addFavorite}>
              <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={24} color='red' />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.detailContainer}>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Original Language: </Text>
              {movie.original_language}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Release Date: </Text>
              {movie.release_date}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Popularity: </Text>
              {movie.popularity}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Vote Count: </Text>
              {movie.vote_count}
            </Text>
          </View>
        </View>
        <MovieList
          title='Recommended Movies'
          path={`movie/${id}/recommendations?language=en-US&page=1`}
          coverType='poster'
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdropImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  gradientStyle: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },
  titleContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleAndRating: {
    flexDirection: "column",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "yellow",
  },
  detailContainer: {
    paddingHorizontal: 16,
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoColumn: {
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoLabel: {
    fontWeight: "bold",
  },
})

export default MovieDetail

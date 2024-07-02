// src/components/search/KeywordSearch.tsx
import React, { useState } from "react"
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import { API_ACCESS_TOKEN } from "@env"
import type { Movie } from "../../types/app"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { BottomTabParamList } from "../../types/navigation" // Pastikan tipe navigasi Anda sesuai

type NavigationProp = StackNavigationProp<BottomTabParamList, "Search">

const KeywordSearch = (): JSX.Element => {
  const [query, setQuery] = useState<string>("")
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigationProp>()

  const handleSearch = async () => {
    if (!query) return

    setLoading(true)

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=1`, options)
      const data = await response.json()
      if (data.results) {
        setResults(data.results)
      } else {
        setResults([])
      }
    } catch (error) {
      console.error("Error fetching movies by keyword:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <TextInput style={styles.input} placeholder='Search by keyword' value={query} onChangeText={setQuery} />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' style={styles.loading} />
      ) : (
        <FlatList
          data={results}
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderRadius: 50,
    fontSize: 16,
    backgroundColor: "#f0f0f0",
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#007bff",
    paddingVertical: 12,
  },
  buttonText: {
    textAlign: "center",
  },
  resultItem: {
    flexDirection: "row",
    padding: 12,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: "#666",
  },

  movieInfo: {
    justifyContent: "center",
  },

  loading: {
    marginTop: 20,
  },
})

export default KeywordSearch

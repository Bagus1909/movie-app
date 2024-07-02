// src/components/search/CategorySearch.tsx
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { API_ACCESS_TOKEN } from "@env"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { SearchStackParamList } from "../../types/navigation" // Pastikan tipe navigasi Anda sesuai

type NavigationProp = StackNavigationProp<SearchStackParamList, "Search">

type Genre = {
  id: number
  name: string
}

const CategorySearch = (): JSX.Element => {
  const [categories, setCategories] = useState<Genre[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const navigation = useNavigation<NavigationProp>()

  useEffect(() => {
    const fetchCategories = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_ACCESS_TOKEN}`,
        },
      }

      try {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list", options)
        const data = await response.json()
        if (data.genres) {
          setCategories(data.genres)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => navigation.navigate("CategoryMovies", { id: item.id, name: item.name })}>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
  categoryButton: {
    flex: 1,
    margin: 10,
    paddingVertical: 20,
    backgroundColor: "#C0B4D5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
})

export default CategorySearch

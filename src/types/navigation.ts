// src/types/navigation.ts
export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Favorite: undefined;
  MovieDetail: { id: number };
};

export type SearchStackParamList = {
  SearchScreen: undefined; // Add this line
  CategoryMovies: { id: number; name: string };
  MovieDetail: { id: number };
};


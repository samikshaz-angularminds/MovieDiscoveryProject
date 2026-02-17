import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { fetchPopularMovies } from '../api/tmdb';
import { useNavigation } from '@react-navigation/native';
import { Movie } from '../types/movie';

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const loadMovies = async () => {
    if (loading) return;
    setLoading(true);
    const data = await fetchPopularMovies(page);
    setMovies(prev => [...prev, ...data.results]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

   const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetail', { movieId }); // Now properly typed
  };
  

  useEffect(() => {
    loadMovies();
  }, []);

  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => handleMoviePress(item.id )}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#fff" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 8,
  },
  movieContainer: {
    margin: 8,
    width: 160,
  },
  poster: {
    width: 160,
    height: 240,
    borderRadius: 12,
  },
  title: {
    marginTop: 8,
    color: '#fff',
    fontWeight: 'bold',
    width: 160,
  },
});

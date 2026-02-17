import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { searchMovies } from '../api/tmdb';
import { useNavigation } from '@react-navigation/native';
import { Movie } from '../types/movie';
// import { styled } from 'nativewind';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledTextInput = styled(TextInput);
// const StyledTouchable = styled(TouchableOpacity);
// const StyledImage = styled(Image);

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setPage(1);
    const data = await searchMovies(query, 1);
    setMovies(data.results);
    setLoading(false);
  };

  const loadMore = async () => {
    setLoading(true);
    const data = await searchMovies(query, page + 1);
    setMovies(prev => [...prev, ...data.results]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="m-2 flex-row items-center"
      onPress={() => navigation.navigate('Details', { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
        className="w-20 h-30 rounded-lg"
      />
      <View className="ml-2 flex-1">
        <Text className="text-white font-bold">{item.title}</Text>
        <Text className="text-gray-400">{item.release_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-black p-2">
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor="#888"
        className="bg-gray-800 text-white rounded p-2 mb-4"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {loading && page === 1 ? <ActivityIndicator size="large" color="white" /> : null}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

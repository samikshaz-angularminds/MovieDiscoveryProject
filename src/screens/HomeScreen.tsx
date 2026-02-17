import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Image, Text, View } from 'react-native';
import { fetchPopularMovies } from '../api/tmdb';
import { useNavigation } from '@react-navigation/native';
// import { styled } from 'nativewind/native';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledImage = styled(Image);
// const StyledTouchable = styled(TouchableOpacity);

export default function HomeScreen() {
  const [movies, setMovies] = useState<m>([]);
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

  useEffect(() => {
    loadMovies();
  }, []);

  const renderItem = ({ item }) => (
    <StyledTouchable
      className="m-2"
      onPress={() => navigation.navigate('Details', { movieId: item.id })}
    >
      <StyledImage
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        className="w-40 h-60 rounded-lg"
      />
      <StyledText className="mt-2 text-white font-bold w-40">{item.title}</StyledText>
    </StyledTouchable>
  );

  return (
    <StyledView className="flex-1 bg-black p-2">
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="white" /> : null}
      />
    </StyledView>
  );
}

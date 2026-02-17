import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { fetchMovieDetails } from '../api/tmdb';
// import { styled } from 'nativewind';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Movie } from '../types/movie';
import { CrewMember } from '../types/crew';

// const StyledView = styled(View);
// const StyledText = styled(Text);
// const StyledImage = styled(Image);

// Define navigation stack param types
type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Details: { movieId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Details'> & {
  navigation: any;
};



export default function MovieDetailsScreen({ route }: Props) {
  const { movieId } = route.params;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CrewMember[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const data = await fetchMovieDetails(movieId);
      setMovie(data.details);
      setCast(data.credits.cast.slice(0, 10));
      setReviews(data.reviews.results);
      setLoading(false);
    };
    loadDetails();
  }, [movieId]);

  if (loading)
    return (
      <ActivityIndicator size="large" color="white" className="flex-1" />
    );

  return (
    <View style={{ backgroundColor: 'black', flex: 1, padding: 16 }}>
        
    <ScrollView className="bg-black flex-1 p-4">
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
        className="w-full h-80 rounded-lg mb-4"
      />
      <Text className="text-white text-2xl font-bold">{movie?.title}</Text>
      <Text className="text-gray-400 mb-2">
        {movie?.release_date} | {movie?.runtime} min
      </Text>
      <Text className="text-white mb-2">
        {movie?.genres.map((g) => g.name).join(', ')}
      </Text>
      <Text className="text-yellow-400 mb-4">
        ⭐ {movie?.vote_average} ({movie?.vote_count})
      </Text>

      <Text className="text-white text-xl mb-2">Cast</Text>
      <FlatList
        data={cast}
        keyExtractor={(item) => item.cast_id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="mr-4 items-center">
            {item.profile_path ? (
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w200${item.profile_path}` }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-700" />
            )}
            <Text className="text-white mt-1">{item.name}</Text>
          </View>
        )}
      />

      <Text className="text-white text-xl mt-6 mb-2">Reviews</Text>
      {reviews.map((r) => (
        <View key={r.id} className="mb-4">
          <Text className="text-gray-300 font-bold">{r.author}</Text>
          <Text className="text-white">{r.content}</Text>
        </View>
      ))}
    </ScrollView>
    </View>

  )
  
}

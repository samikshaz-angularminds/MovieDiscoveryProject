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
import { styled } from 'nativewind';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

// Define navigation stack param types
type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Details: { movieId: number };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

// Movie type
interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
}

// Cast type
interface CastMember {
  cast_id: number;
  name: string;
  profile_path: string | null;
}

// Review type
interface Review {
  id: string;
  author: string;
  content: string;
}

export default function MovieDetailsScreen({ route }: Props) {
  const { movieId } = route.params;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
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
    <ScrollView className="bg-black flex-1 p-4">
      <StyledImage
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
        className="w-full h-80 rounded-lg mb-4"
      />
      <StyledText className="text-white text-2xl font-bold">{movie?.title}</StyledText>
      <StyledText className="text-gray-400 mb-2">
        {movie?.release_date} | {movie?.runtime} min
      </StyledText>
      <StyledText className="text-white mb-2">
        {movie?.genres.map((g) => g.name).join(', ')}
      </StyledText>
      <StyledText className="text-yellow-400 mb-4">
        ⭐ {movie?.vote_average} ({movie?.vote_count})
      </StyledText>

      <StyledText className="text-white text-xl mb-2">Cast</StyledText>
      <FlatList
        data={cast}
        keyExtractor={(item) => item.cast_id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <StyledView className="mr-4 items-center">
            {item.profile_path ? (
              <StyledImage
                source={{ uri: `https://image.tmdb.org/t/p/w200${item.profile_path}` }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <StyledView className="w-24 h-24 rounded-full bg-gray-700" />
            )}
            <StyledText className="text-white mt-1">{item.name}</StyledText>
          </StyledView>
        )}
      />

      <StyledText className="text-white text-xl mt-6 mb-2">Reviews</StyledText>
      {reviews.map((r) => (
        <StyledView key={r.id} className="mb-4">
          <StyledText className="text-gray-300 font-bold">{r.author}</StyledText>
          <StyledText className="text-white">{r.content}</StyledText>
        </StyledView>
      ))}
    </ScrollView>
  );
}

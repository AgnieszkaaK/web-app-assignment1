import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCredits } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const MoviePage = () => {
  const { id } = useParams();

  // Fetch movie details
  const { data: movie, error, isPending, isError } = useQuery({
    queryKey: ['movie', { id }],
    queryFn: getMovie,
  });

  // ✅ Fetch credits
  const { data: credits, isPending: creditsLoading } = useQuery({
    queryKey: ['credits', { id }],
    queryFn: getMovieCredits,
  });

  if (isPending || creditsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          {/* ✅ Pass credits to MovieDetails */}
          <MovieDetails movie={movie} credits={credits} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
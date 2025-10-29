import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMoviesWeek } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const TrendingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["trendingMoviesWeek"],
    queryFn: getTrendingMoviesWeek,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Movies Trending This Week"
      movies={movies}
      action={(movie) => {
        return (
    <>
      <AddToFavoritesIcon movie={movie} />
      <AddToPlaylistIcon movie={movie} />
    </>
  );
      }}
    />
  );
};

export default TrendingMoviesPage;
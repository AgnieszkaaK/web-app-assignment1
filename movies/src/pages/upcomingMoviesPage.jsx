import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const UpcomingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));


  const playlist = movies.filter(m => m.playlist)
  localStorage.setItem('favorites', JSON.stringify(playlist))
  const addToPlaylist = (movieId) => true 

  return (
<PageTemplate
  title="Upcoming Movies"
  movies={movies}
  action={(movie) => <AddToPlaylistIcon movie={movie} />}
/>
  );
};

export default UpcomingMoviesPage;